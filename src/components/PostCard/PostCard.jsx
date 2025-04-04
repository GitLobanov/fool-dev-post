import React from 'react';
import './PostCard.css'; // Создайте этот CSS файл

// Принимает пропсы с данными поста
const PostCard = ({ author, timestamp, title, tags, content }) => {
    return (
        <article className="post-card">
            <div className="post-header">
                {/* Аватар автора */}
                <img src="https://via.placeholder.com/40" alt={`${author} Avatar`} className="post-avatar" />
                <div className='post-meta'>
                    <span className="post-author">{author}</span>
                    <span className="post-timestamp">{timestamp}</span>
                </div>
                {/* Здесь могут быть иконки действий (меню ...) */}
            </div>
            <div className="post-content">
                <h2 className="post-title">{title}</h2>
                {/* Отображение тегов */}
                {tags && tags.length > 0 && (
                    <div className="post-tags">
                        {tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                )}
                {/* Контент поста - можно обрезать или добавить "Читать далее" */}
                <p className="post-excerpt">
                    {content.substring(0, 250)}{content.length > 250 ? '...' : ''}
                </p>
                {/* Можно добавить кнопку "Читать далее" */}
                {content.length > 250 && <button className="read-more-btn">Читать далее</button>}
            </div>
            <div className="post-footer">
                {/* Лайки, комментарии, репосты */}
                <button className="action-btn">👍 284</button>
                <button className="action-btn">💬 24</button>
                <button className="action-btn">🔗 49</button>
            </div>
        </article>
    );
};

export default PostCard;