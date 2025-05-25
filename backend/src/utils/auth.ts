import jwt from 'jsonwebtoken';

// JWTの認証処理
export const auth = (authorization: any) => {

    // トークンの有無を判定
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return { isValid: false, message: '認証トークンがありません' };
    }

    // トークンの接頭辞に'Bearer 'がついているため接頭辞とトークン自体を分解
    const token = authorization!.split(' ')[1];

    // 送られたトークンとシークレットキーをもって確認をする。
    try {
        jwt.verify(token!, process.env.JWT_SECRET as string);
        return { isValid: true, message: '認証OK' }
    } catch (err) {
        return { isValid: false, message: 'トークンが無効です' };
    }

}