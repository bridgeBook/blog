import '../index.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ButtonUI } from '../components/UI';
import { useAuth } from '../contexts/AuthContext';

interface Article {
    _id: string;
    title: string;
    content: string;
    username: string;
    createdAt: string;
}

const PostView = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { username } = useAuth();
    const [showLogin, setShowLogin] = useState(true)


    // 記事詳細の取得
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/getDetail`, {
                    params: { id }
                });
                setArticle(res.data);
            } catch (err) {
                console.error(err);
                setError('記事の取得に失敗しました');
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    // 記事の編集、削除ボタンの表示判定
    useEffect(() => {
        if (!username) {
            setShowLogin(false);
            console.log("1")
        } else if (username === article?.username) {
            setShowLogin(true);
            console.log("2")
        } else {
            setShowLogin(false);
            console.log("3")
        }
    }, [article, username])

    if (loading) {
        return (
            <div className="w-[800px] mx-auto py-8">
                <div className="text-center">読み込み中...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-[800px] mx-auto py-8">
                <div className="text-center text-red-600">{error}</div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="w-[800px] mx-auto py-8">
                <div className="text-center">記事が見つかりませんでした</div>
            </div>
        );
    }

    return (
        <div className="w-[800px] mx-auto py-8">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                    <div className="mb-4 flex justify-between">
                        <div>
                            <Link to="/" className="text-indigo-600 hover:text-indigo-800">
                                ← 記事一覧に戻る
                            </Link>
                        </div>
                        <div className={showLogin ? "flex gap-4" : "hidden"}>
                            <button className={`${ButtonUI}`}>編集</button>
                            <button className={`${ButtonUI}`}>削除</button>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {article.title}
                    </h1>
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-sm text-gray-500">
                            投稿者: {article.username}
                        </span>
                        <span className="text-sm text-gray-500">
                            {new Date(article.createdAt).toLocaleDateString('ja-JP')}
                        </span>
                    </div>
                    <div className="prose max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-pre:bg-gray-100 prose-pre:text-gray-900 prose-pre:rounded-lg prose-pre:p-4 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic [&_p]:break-words [&_pre]:break-words [&_code]:break-words [&_li]:break-words">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {article.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostView;