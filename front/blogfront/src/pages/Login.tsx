import '../index.css'
import { Link } from "react-router-dom";
import { useState } from 'react';

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
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                // トークンをlocalStorageに保存
                localStorage.setItem('token', data.token);
                alert('ログイン成功');
                // ログイン後に別のページに遷移させる場合など
                // window.location.href = '/dashboard'; // ダッシュボードにリダイレクト
            } else {
                setError(data.message || 'ログインに失敗しました');
            }
        } catch (err) {
            setError('サーバーエラー: ' + err);
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
