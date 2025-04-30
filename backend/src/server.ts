import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/apiRoutes'
import connectDB from './db/connect'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') }) // パスを明示
connectDB() // ← MongoDBに接続！

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api', postRoutes)

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`)
    })
  })
  .catch(err => console.error('❌ DB connection error:', err))
