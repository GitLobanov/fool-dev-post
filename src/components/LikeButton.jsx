import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton = ({ postId, userId }) => {
    const [likes, setLikes] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        axios.get(`/api/likes/post/${postId}`)
            .then((response) => {
                const likesData = Array.isArray(response.data) ? response.data : []; // Защита от undefined
                setLikes(likesData);
                setIsLiked(likesData.some((like) => like.userId === userId));
            })
            .catch((error) => {
                console.error("Ошибка загрузки лайков:", error);
                setLikes([]);
            });
    }, [postId, userId]);

    const handleLike = async () => {
        try {
            const response = await axios.post('/api/likes/toggle', { postId, userId });
            setLikes(Array.isArray(response.data) ? response.data : []);
            setIsLiked(response.data.some((like) => like.userId === userId));
        } catch (error) {
            console.error("Ошибка лайка:", error);
        }
    };

    return (
        <div>
            <div>
                <button onClick={handleLike}>
                    {isLiked ? '❤️' : '🤍'} {likes ? likes.length : 0}
                </button>
            </div>
        </div>
    );
};

export default LikeButton;