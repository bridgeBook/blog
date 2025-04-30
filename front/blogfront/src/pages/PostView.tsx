import '../index.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const PostView = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState<any>();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/getDetail`, {
                    params: {
                        id: id
                    }
                });
                setPosts(res);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPosts();
    }, []);

    console.log(posts)

    return (
        <>
            {id}
            <Link className="login" to="/">home画面に戻る</Link>
        </>
    )
}

export default PostView