import '../index.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    // ステートの定義
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');

    // ログイン処理
    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();  // デフォルトのフォーム送信を防ぐ

        // 入力値の検証（必要に応じて追加）
        if (!username || !email || !password || !rePassword) {
            setError('すべての項目を入力してください');
            return;
        }

        // 入力値の検証（必要に応じて追加）
        if (!(password === rePassword)) {
            setError('再入力されたパスワードが異なっています');
            return;
        }

        try {
            const res = await axios.post(`http://localhost:5000/api/userRegister`, {
                params: {
                    username: username,
                    email: email,
                    password: password
                }
            });

            console.log('✅ 登録成功:', res.data.message);
            setError("")

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
        <div className="signup-container">
            <div>
                <Link className="signup" to="/">home画面に戻る</Link>
            </div>
            <h2>新規登録</h2>
            <form onSubmit={handleSignup}>
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
                    <label>メールアドレス</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div>
                    <label>パスワード確認</label>
                    <input
                        type="password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">登録</button>
            </form>
        </div>
    );
};

export default Signup