import '../index.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // ステートの定義
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

            console.log('✅ ログイン成功:', res.data);
            localStorage.setItem('token', res.data);
            navigate('/');

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
            <div>
                <Link className="login" to="/">home画面に戻る</Link>
            </div>
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
        </div>
    );
};

export default Login
