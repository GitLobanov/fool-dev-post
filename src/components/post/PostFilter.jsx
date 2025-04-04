import React, { useState } from 'react';

const PostFilter = ({ onFilter }) => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [tag, setTag] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ search, category, tag });
    };

    const handleReset = () => {
        setSearch('');
        setCategory('');
        setTag('');
        onFilter({ search: '', category: '', tag: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="filter-form">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Фильтр по названию"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Все категории</option>
                <option value="Web">Web</option>
                <option value="Mobile">Mobile</option>
                <option value="DevOps">DevOps</option>
            </select>
            <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            >
                <option value="">Все тэги</option>
                <option value="React">React</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
            </select>
            <button type="submit">Применить</button>
            <button type="button" onClick={handleReset}>Сбросить</button>
        </form>
    );
};

export default PostFilter;