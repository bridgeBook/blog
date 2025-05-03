import mongoose, { Schema, Document } from 'mongoose'

// Post の型定義（MongoDBの1レコードに相当）
export interface IUser extends Document {
    username: string
    email: string
    password: string
}

// スキーマの定義（DBのカラム構造みたいなもの）
const UserSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // createdAt, updatedAt が自動でつく
)

// モデルとしてエクスポート
const User = mongoose.model<IUser>('User', UserSchema)
export default User
