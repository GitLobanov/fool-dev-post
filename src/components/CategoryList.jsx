import React from 'react';

const CategoryList = ({ categories }) => {
    return (
        <div>
            <h3>Категории</h3>
            <ul>
                {categories.map((category) => (
                    <li key={category}>{category}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;