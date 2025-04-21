import mongoose from 'mongoose'

const connectDB = async () => {
    require('dotenv').config();
    const env = process.env.MONGO_URI;
    try {
        const conn = await mongoose.connect(env as string)
        console.log(`✅ MongoDB 接続成功: ${conn.connection.host}`)
    } catch (err) {
        console.error('❌ MongoDB 接続エラー', err)
        process.exit(1) // 接続失敗ならアプリを終了
    }
}

export default connectDB
