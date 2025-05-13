import '../index.css'
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
    const limitedArticles = articles.slice(0, 10);
    return (
        <div className="w-[800px] mx-auto py-8">
            <div className="space-y-6">
                {limitedArticles.map((article) => (
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
                            <div className="prose max-w-none prose-p:text-gray-600 prose-headings:text-gray-900 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-pre:bg-gray-100 prose-pre:text-gray-900 prose-pre:rounded-lg prose-pre:p-4 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic [&_p]:break-words [&_pre]:break-words [&_code]:break-words [&_li]:break-words">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {article.content.length > 200 ? article.content.slice(0, 200) + '...' : article.content}
                                </ReactMarkdown>
                            </div>
                            <div className="flex justify-between items-center mt-4">
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