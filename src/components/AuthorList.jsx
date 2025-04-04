import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubscribeButton from "./SubscribeButton";

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        const response = await axios.get('/api/authors');
        setAuthors(response.data);
    };

    return (
        <div>
            <h2>Авторы</h2>
            <ul>
                {authors.map((author) => (
                    <li key={author.id}>
                        <p>{author.name}</p>
                        <SubscribeButton authorId={author.id} followerId="currentUserId" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorList;