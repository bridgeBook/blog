import '../index.css'
import { Link } from "react-router-dom";

interface Article {
    _id: string;
    title: string;
    content: string;
    username: string;
    createdAt: string;
}

interface ArticleListProps {
    articles: Article[];
}

const ArticleList = ({ articles }: ArticleListProps) => {
    return (
        <div className="w-[800px] mx-auto py-8">
            <div className="space-y-6">
                {articles.map((article) => (
                    <div key={article._id} className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold text-gray-900">
                                    <Link to={`/PostView/${article._id}`} className="hover:text-indigo-600">
                                        {article.title}
                                    </Link>
                                </h2>
                                <span className="text-sm text-gray-500">
                                    {new Date(article.createdAt).toLocaleDateString('ja-JP')}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {article.content}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    投稿者: {article.username}
                                </span>
                                <Link
                                    to={`/PostView/${article._id}`}
                                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                >
                                    続きを読む →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleList;