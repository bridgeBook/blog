import '../index.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

const ArticleList = () => {
    const [posts, setPosts] = useState<any>();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts');
                setPosts(res);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPosts();
    }, []);

    const Article = () => {
        if (!posts) return <div>Loading...</div>;
        return (
            <>
                {
                    posts.data.slice(0, 6).map((post: any) =>
                        <div className="article">
                            <div>
                                {post.title}
                            </div>
                        </div>
                    )
                }
            </ >
        );
    }

    return (
        <div className="articleList">
            <Article />
        </div>
    )
}

export default ArticleList