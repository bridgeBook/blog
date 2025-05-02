import '../index.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    // ステートの定義
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // ログイン処理
    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();  // デフォルトのフォーム送信を防ぐ

        // 入力値の検証（必要に応じて追加）
        if (!username || !password) {
            setError('ユーザー名とパスワードは必須です');
            return;
        }

        try {
            const res = await axios.post(`http://localhost:5000/api/login`, {
                params: {
                    username: username,
                    password: password
                }
            });

            console.log('✅ ログイン成功:', res.data.message);
            console.log('🔐 トークン:', res.data.token);
            alert('ログイン成功');

        } catch (error: any) {
            if (error.response) {
                console.log('❌ エラー:', error.response.data.error);
                setError(error.response.data.error || 'ログインに失敗しました');
            } else {
                console.log('❌ 通信エラー:', error.message);
            }
        }
    };

    return (
        <div className="login-container">
            <h2>ログイン</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>ユーザー名</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>パスワード</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">ログイン</button>
            </form>

            <div>
                ログイン画面
                <Link className="login" to="/">home画面に戻る</Link>
            </div>
        </div>
    );
};

export default Login
