import mongoose, { Schema, Document } from 'mongoose'

// Post の型定義（MongoDBの1レコードに相当）
export interface IPost extends Document {
  title: string
  content: string
  createdAt: Date
}

// スキーマの定義（DBのカラム構造みたいなもの）
const PostSchema: Schema<IPost> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt が自動でつく
)

// モデルとしてエクスポート
const Post = mongoose.model<IPost>('Post', PostSchema)
export default Post
