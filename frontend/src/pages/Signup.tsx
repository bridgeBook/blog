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
                setError(error.response.data.error || '登録に失敗しました');
            } else {
                console.log('❌ 通信エラー:', error.message);
            }
        }
    };

    return (
        <div className="min-h-[80vh] bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    新規登録
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    または{' '}
                    <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                        ホームに戻る
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSignup}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                ユーザー名
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                メールアドレス
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                パスワード
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">
                                パスワード確認
                            </label>
                            <div className="mt-1">
                                <input
                                    id="rePassword"
                                    type="password"
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="h-16 w-[300px] mx-auto">
                            {error ? (
                                <div className="rounded-md bg-red-50 p-4 w-full">
                                    <div className="flex">
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800">
                                                {error}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                登録
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup