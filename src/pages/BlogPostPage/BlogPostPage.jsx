import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import './BlogPostPage.css'; // Стили для страницы

// --- Mock Data (Возьмем из BlogPage для примера) ---
// В реальном приложении здесь будет API вызов типа fetch(`/api/blog-posts/${postId}`)
const mockBlogPosts = [
    { id: 'blog-1', title: 'Рассказ о принципах REST', description: '...', content: 'Полный текст о **Клиент-серверной архитектуре**, **Stateless**, **Кешировании**, **Единообразии интерфейса**... Очень-очень много текста для демонстрации полного контента. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', author: { id: 'user-1', name: 'John Doe', avatarUrl: 'https://via.placeholder.com/40' }, timestamp: '2 days ago', tags: [{ id: 'tag-1', name: '#rest' }, { id: 'tag-2', name: '#api' }], resources: [{ id: 'res-1', title: 'Roy Fielding\'s Dissertation', link: '...' }] },
    { id: 'blog-2', title: 'Переменная volatile под капотом Java', description: '...', content: 'Детальное объяснение работы volatile, барьеры памяти, happens-before relationship... Здесь тоже будет много текста, описывающего все нюансы работы volatile в Java и JVM.', author: { id: 'user-2', name: 'Jane Smith', avatarUrl: 'https://via.placeholder.com/40' }, timestamp: '5 days ago', tags: [{ id: 'tag-4', name: '#java' }, { id: 'tag-5', name: '#multithreading' }], resources: [] },
];
// --- End Mock Data ---

const BlogPostPage = () => {
    const { postId } = useParams(); // Получаем postId из URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        // Имитация запроса к API
        const timer = setTimeout(() => {
            const foundPost = mockBlogPosts.find(p => p.id === postId);
            if (foundPost) {
                setPost(foundPost);
            } else {
                setError('Пост не найден.');
            }
            setLoading(false);
        }, 300); // Имитация задержки

        return () => clearTimeout(timer);
    }, [postId]); // Перезапускаем эффект, если postId изменился

    if (loading) {
        return <div className="post-detail-loading">Загрузка поста...</div>;
    }

    if (error) {
        return <div className="post-detail-error">Ошибка: {error}</div>;
    }

    if (!post) {
        // Эта ситуация не должна возникать при правильной логике, но на всякий случай
        return <div className="post-detail-error">Пост не найден.</div>;
    }

    // --- Рендеринг найденного поста ---
    return (
        <div className="blog-post-page post-detail-container">
            {/* Ссылка для возврата к списку */}
            <Link to="/blog" className="back-link">← Назад к блогу</Link>

            <article className="post-full-content">
                <h1>{post.title}</h1>

                {/* Метаданные поста */}
                <div className="post-detail-meta">
                    <img src={post.author?.avatarUrl || "https://via.placeholder.com/30"} alt={post.author?.name}
                         className="author-avatar-small"/>
                    <span>Автор: {post.author?.name || 'Unknown'}</span>
                    <span className="separator">|</span>
                    <span>{post.timestamp || 'Дата неизвестна'}</span>
                </div>

                {/* Теги */}
                {post.tags && post.tags.length > 0 && (
                    <div className="post-detail-tags">
                        {post.tags.map(tag => <span key={tag.id} className="tag">{tag.name}</span>)}
                    </div>
                )}

                {/* Основной контент поста */}
                <div className="content-body">
                    <ReactMarkdown
                        children={post.content || ''} // Передаем markdown строку
                        remarkPlugins={[remarkGfm]}    // Включаем GFM (таблицы, etc.)
                        rehypePlugins={[rehypeHighlight]} // Включаем подсветку кода
                        // Можно настроить компоненты, если нужно кастомное отображение
                        // components={{
                        //     a: ({node, ...props}) => <a target="_blank" rel="noopener noreferrer" {...props} />,
                        //     // другие кастомные рендеры
                        // }}
                    />
                </div>

                {/* Ресурсы */}
                {post.resources && post.resources.length > 0 && (
                    <div className="post-detail-resources">
                        <h3>Дополнительные ресурсы:</h3>
                        <ul>
                            {post.resources.map(resource => (
                                <li key={resource.id}>
                                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                        {resource.title || resource.link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </article>
            {/* Здесь можно добавить секцию комментариев */}
        </div>
    );
};

export default BlogPostPage;