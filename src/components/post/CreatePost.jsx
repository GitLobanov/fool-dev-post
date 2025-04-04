import React, { useState } from 'react';
import { createPost } from '../../api';

const CreatePost = ({ categories, tags }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = { title, content, category: selectedCategory, tags: selectedTags };
        await createPost(post);
        alert('Пост создан!');
    };

    const handleTagChange = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    return (
        <div className={"container"}>
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
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Выберите категорию</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <div>
                    {tags.map((tag) => (
                        <label key={tag}>
                            <input
                                type="checkbox"
                                checked={selectedTags.includes(tag)}
                                onChange={() => handleTagChange(tag)}
                            />
                            {tag}
                        </label>
                    ))}
                </div>
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default CreatePost;