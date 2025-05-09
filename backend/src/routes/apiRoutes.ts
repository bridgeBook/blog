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
        const { title, content, username } = req.body
        const newPost = new Post({ title, content, username })
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (err) {
        res.status(400).json({ error: '投稿に失敗しました' + err })
    }
})


router.post('/userRegister', async (req: Request, res: Response) => {

    const username = req.body.params.username
    const email = req.body.params.email
    const password = req.body.params.password

    try {
        // 同一メールアドレスの重複確認
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ error: '既に存在しているユーザー名です' });
            return;
        }

        // 同一メールアドレスの重複確認
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            res.status(400).json({ error: '既に登録済みのメールアドレスです' });
            return;
        }

        // パスワードをハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);

        // ユーザー作成
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'ユーザー登録が完了しました' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'サーバーエラー' });
    }
});

// ログイン
router.post('/login', async (req: Request, res: Response) => {
    try {
        const username = req.body.params.username
        const password = req.body.params.password

        // ユーザーの存在確認
        const user = await User.findOne({ username });

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
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'ログイン成功', token, user });

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'サーバーエラー' });
    }
});

export default router
