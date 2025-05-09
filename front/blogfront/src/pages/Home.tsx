import '../index.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleList from '../components/ArticleList';

interface Article {
    _id: string;
    title: string;
    content: string;
    username: string;
    createdAt: string;
}

const Home = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getList');
                setArticles(response.data);
                setLoading(false);
            } catch (err) {
                console.error('記事の取得に失敗しました:', err);
                setError('記事の取得に失敗しました');
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return (
            <div className="w-[800px] mx-auto py-8 text-center">
                読み込み中...
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-[800px] mx-auto py-8 text-center text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] bg-gray-50">
            <div className="w-[800px] mx-auto py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">記事一覧</h1>
                <ArticleList articles={articles} />
            </div>
        </div>
    );
};

export default Home;