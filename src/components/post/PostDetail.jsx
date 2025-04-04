import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LikeButton from '../LikeButton';
import Comments from '../Comments';
import PostConnections from './PostConnections';


const PostDetail = () => {
    const { postId } = useParams(); // Получаем ID поста из URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const connections = [
        { id: 1, source: 'Пост 1', target: 'Пост 2' },
        { id: 2, source: 'Пост 2', target: 'Пост 3' },
    ];

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${postId}`);
                setPost(response.data);
            } catch (err) {
                setError('Ошибка загрузки поста');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;
    if (!post) return <div>Пост не найден</div>;

    return (
        <div className={"container"}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <LikeButton postId={post.id} userId="currentUserId" />
            <PostConnections connections={connections} />
            <Comments postId={post.id} />
        </div>
    );
};

export default PostDetail;