import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/posts/${id}`).then((response) => {
            setTitle(response.data.title);
            setContent(response.data.content);
            setCategory(response.data.category);
            setTags(response.data.tags);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`/api/posts/${id}`, { title, content, category, tags });
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Заголовок"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Контент"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Категория"
            />
            <input
                type="text"
                value={tags.join(',')}
                onChange={(e) => setTags(e.target.value.split(','))}
                placeholder="Тэги (через запятую)"
            />
            <button type="submit">Сохранить</button>
        </form>
    );
};

export default EditPost;