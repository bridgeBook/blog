import express, { Request, Response } from 'express'
import Post from '../models/post'

const router = express.Router()

// 一覧取得
router.get('/posts', async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
        res.json(posts)
    } catch (err) {
        res.status(500).json({ error: 'サーバーエラー' })
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
        res.status(400).json({ error: '投稿に失敗しました' })
    }
})

export default router
