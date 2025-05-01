import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/apiRoutes'
import connectDB from './db/connect'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') }) // .env 読み込み

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api', postRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`)
  });
});
