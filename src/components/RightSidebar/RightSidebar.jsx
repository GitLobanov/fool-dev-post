import React from 'react';
import './RightSidebar.css'; // Создайте этот CSS файл

const RightSidebar = () => {
    // Примерные данные
    const trendingTags = ['#redis', '#spring core', '#java core', '#react', '#typescript', '#docker'];
    const popularPosts = [
        { id: 1, title: 'Принципы REST', description: 'REST включает 6 принципов...' },
        { id: 2, title: 'Что нового в Java 21?', description: 'Обзор основных фич...' },
        { id: 3, title: 'SSR vs CSR в React', description: 'Когда что использовать?' },
    ];

    return (
        <aside className="right-sidebar">
            {/* Блок Популярных тегов */}
            <div className="sidebar-card">
                <h3 className="sidebar-card-title">Популярные теги</h3>
                <div className="tag-list">
                    {trendingTags.map(tag => (
                        <a href={`/tags/${tag.substring(1)}`} key={tag} className="tag-badge">
                            {tag}
                        </a>
                    ))}
                </div>
            </div>

            {/* Блок Популярных постов */}
            <div className="sidebar-card">
                <h3 className="sidebar-card-title">Популярные посты</h3>
                <ul className="popular-post-list">
                    {popularPosts.map(post => (
                        <li key={post.id}>
                            <a href={`/posts/${post.id}`}>{post.title}</a>
                            <p>{post.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Можно добавить другие блоки: Рекомендуемые блоги, Реклама и т.д. */}

        </aside>
    );
};

export default RightSidebar;