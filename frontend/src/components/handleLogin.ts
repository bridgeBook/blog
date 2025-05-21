import axios, { AxiosError } from 'axios';
import { ErrorCodes, ErrorMessages } from '../utils/errors';

// 型定義
export interface LoginParams {
    username: string;
    password: string;
}

export interface LoginCallbacks {
    setError: (error: string) => void;
    navigate: (path: string) => void;
    login: (username: string, token: string) => void;
}

// カスタムエラークラスの定義
export class LoginError extends Error {
    constructor(
        message: string,
        public code: string,
        public status?: number
    ) {
        super(message);
        this.name = 'LoginError';
    }
}

// handleLogin関数をエクスポート
export const handleLogin = async (
    username: string,
    password: string,
    setError: (error: string) => void,
    navigate: (path: string) => void,
    login: (username: string, token: string, userid: string) => void
) => {
    try {
        // 入力値の検証
        if (!username || !password) {
            setError(ErrorMessages[ErrorCodes.VALIDATION_ERROR]);
            return;
        }

        const res = await axios.post(`http://localhost:5000/api/login`, {
            params: {
                username: username,
                password: password
            }
        });

        console.log('✅ ログイン成功:', res.data);
        login(username, res.data, res.data.user._id);
        navigate('/');

    } catch (error) {
        if (error instanceof AxiosError) {
            // Axiosエラーの処理
            if (error.response) {
                // サーバーからのレスポンスがある場合
                const status = error.response.status;
                const errorMessage = error.response.data?.error || ErrorMessages[ErrorCodes.SERVER_ERROR];

                if (status === 401) {
                    setError(ErrorMessages[ErrorCodes.AUTHENTICATION_ERROR]);
                } else {
                    setError(errorMessage);
                }
            } else if (error.request) {
                // リクエストは送信されたがレスポンスがない場合
                setError(ErrorMessages[ErrorCodes.NETWORK_ERROR]);
            }
        } else {
            // その他の予期せぬエラー
            setError(ErrorMessages[ErrorCodes.UNKNOWN_ERROR]);
        }
    }
};