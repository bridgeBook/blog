import '../index.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

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

    console.log(posts)

    const Article = () => {
        if (!posts) return <div>Loading...</div>;
        return (
            <>
                {
                    posts.data.slice(0, 6).map((post: any) =>

                        <Link to={`/PostView/${post._id}`}>
                            <div className="article">
                                <div className='content-title'>{post.title}</div>
                                <div className='content'>{post.content}</div>
                                <div className='updated-time'>{post.updatedAt.substr(0, 10)}</div>
                            </div>
                        </Link>
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