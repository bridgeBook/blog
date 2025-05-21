import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, username, userid } = useAuth();

    // 未ログインの場合はホームにリダイレクト
    if (!isAuthenticated) {
        navigate('/');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content) {
            setError('タイトルと本文は必須です');
            return;
        }

        console.log(userid)

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/posts',
                {
                    title,
                    content,
                    username,
                    userid,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('✅ 投稿成功:', response.data);
            navigate('/');
        } catch (error: any) {
            console.error('❌ 投稿エラー:', error);
            setError(error.response?.data?.error || '投稿に失敗しました');
        }
    };

    return (
        <div className="min-h-[80vh] bg-gray-50 py-8">
            <div className="w-[800px] mx-auto">
                <div className="bg-white shadow rounded-lg">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            新規記事投稿
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    タイトル
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                    本文
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="content"
                                        rows={10}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-md bg-red-50 p-4">
                                    <div className="flex">
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800">
                                                {error}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    投稿する
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost; 