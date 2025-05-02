import express, { Request, Response } from 'express'
import Post from '../models/post'
import User from '../models/user'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import path from 'path'

// 必ず最初に実行すること！
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const router = express.Router();

// 一覧取得
router.get('/getList', async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
        res.json(posts)
    } catch (err) {
        res.status(500).json({ error: 'サーバーエラー' + err })
    }
})

// 詳細取得
router.get('/getDetail', async (req: Request, res: Response) => {
    const id = req.query.id;
    try {
        const posts = await Post.findById(id);
        res.json(posts)
    } catch (err) {
        res.status(500).json({ error: 'サーバーエラー' + err })
    }
})

// 新規投稿
router.post('/posts', async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body
        const newPost = new Post({ title, content })
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (err) {
        res.status(400).json({ error: '投稿に失敗しました' + err })
    }
})


// アカウント登録
router.post('/userRegister', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        // パスワードをハッシュ化
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // ユーザー作成
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'ユーザー登録成功' });
    } catch (err) {
        res.status(400).json({ error: '登録に失敗しました。' })
    }
})

// ログイン
router.post('/login', async (req: Request, res: Response) => {
    try {
        const email = req.body.params.username
        const password = req.body.params.password

        // ユーザーの存在確認
        const user = await User.findOne({ email });
        console.log("取得したユーザー:", user);
        if (!user) {
            console.log("aa")
            res.status(401).json({ error: 'ユーザーが見つかりません' });
            return;
        }

        // パスワード比較
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'パスワードが正しくありません' });
            return
        }

        // JWT発行
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'ログイン成功', token });

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'サーバーエラー' });
    }
});

export default router
