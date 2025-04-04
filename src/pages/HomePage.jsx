import React, { useState } from 'react';
import PostList from '../components/post/PostList';
import PostFilter from '../components/post/PostFilter';
import TagCloud from '../components/TagCloud';
import CategoryList from '../components/CategoryList';

const HomePage = () => {
    const [filters, setFilters] = useState({ search: '', category: '', tag: '' });
    const tags = ['React', 'JavaScript', 'Backend', 'Frontend'];
    const categories = ['Web', 'Mobile', 'DevOps'];

    const handleFilter = (filters) => {
        setFilters(filters);
        // Здесь можно добавить логику для фильтрации постов
        console.log('Фильтры:', filters);
    };

    const handleTagClick = (tag) => {
        setFilters((prev) => ({ ...prev, tag }));
        console.log('Выбран тэг:', tag);
    };

    return (
        <div className={"container"}>
            <PostList />
            <TagCloud tags={tags} onTagClick={handleTagClick} />
            <CategoryList categories={categories} />
        </div>
    );
};

export default HomePage;