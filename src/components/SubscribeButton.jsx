import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscribeButton = ({ authorId, followerId }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        axios.get(`/api/subscriptions/follower/${followerId}`).then((response) => {
            const subscriptions = response.data;
            setIsSubscribed(subscriptions.some((sub) => sub.authorId === authorId));
        });
    }, [authorId, followerId]);

    const handleSubscribe = async () => {
        const response = await axios.post('/api/subscriptions/toggle', { followerId, authorId });
        setIsSubscribed(response.data != null);
    };

    return (
        <button onClick={handleSubscribe}>
            {isSubscribed ? 'Отписаться' : 'Подписаться'}
        </button>
    );
};

export default SubscribeButton;