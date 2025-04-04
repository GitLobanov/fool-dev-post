import React from 'react';
import { Link } from 'react-router-dom'; // Для ссылки "Читать далее"
import './PostCard.css';

// Добавляем пропс `resources` и `postType` (blog/interview) для возможной кастомизации
const PostCard = ({ id, author, timestamp, title, tags, content, description, resources, postType = 'blog' }) => {

    // Определяем, что использовать для превью: description или начало content
    // Предполагаем, что description - это короткое описание, а content - основной текст
    const excerpt = description || (content ? content.substring(0, 250) + (content.length > 250 ? '...' : '') : '');
    const hasMoreContent = content && content.length > 250; // Проверяем, есть ли полный контент для "Читать далее"

    // Определяем ссылку для "Читать далее"
    const postLink = `/${postType === 'blog' ? 'blog' : 'interviews'}/${id}`;

    return (
        <article className="post-card">
            <div className="post-header">
                {/* Аватар автора */}
                <img src={author?.avatarUrl || "https://via.placeholder.com/40"} alt={`${author?.name || 'Author'} Avatar`} className="post-avatar" />
                <div className='post-meta'>
                    {/* Имя автора - может быть ссылкой на профиль */}
                    <span className="post-author">{author?.name || 'Unknown Author'}</span>
                    <span className="post-timestamp">{timestamp || 'some time ago'}</span> {/* Placeholder времени */}
                </div>
                {/* Можно добавить меню действий (...) */}
            </div>
            <div className="post-content">
                {/* Заголовок - может быть ссылкой на полную страницу поста */}
                <Link to={postLink} className="post-title-link">
                    <h2 className="post-title">{title}</h2>
                </Link>

                {/* Отображение тегов, только если они есть */}
                {tags && tags.length > 0 && (
                    <div className="post-tags">
                        {tags.map(tag => <span key={tag.id || tag.name} className="tag">{tag.name}</span>)}
                    </div>
                )}

                {/* Отображение превью/описания */}
                {excerpt && <p className="post-excerpt">{excerpt}</p>}

                {/* Кнопка "Читать далее", если есть больше контента */}
                {hasMoreContent && (
                    <Link to={postLink} className="read-more-btn">Читать далее</Link>
                )}
            </div>

            {/* Отображение ресурсов, если они есть */}
            {resources && resources.length > 0 && (
                <div className="post-resources">
                    <strong>Доп. ресурсы:</strong>
                    <ul>
                        {resources.map(resource => (
                            // Предполагаем, что у ресурса есть id, title и link
                            <li key={resource.id}>
                                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                    {resource.title || resource.link} {/* Показываем title или link */}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Футер с лайками/комментами убран, т.к. нет в БД */}
            {/*
      <div className="post-footer">
         <button className="action-btn">👍 284</button>
         <button className="action-btn">💬 24</button>
         <button className="action-btn">🔗 49</button>
      </div>
       */}
        </article>
    );
};

export default PostCard;