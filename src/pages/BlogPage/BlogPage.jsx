import React, { useState, useEffect } from 'react';
import PostCard from '../../components/PostCard/PostCard';
import './BlogPage.css'; // Стили для страницы блога (если нужны)

// --- Mock Data --- (Замените на реальный API вызов)
// Симулируем данные из таблиц: blog_posts, users, tags, resources, post_tag, post_resources
const mockBlogPosts = [
    {
        id: 'blog-1', // Используем строки для UUID
        title: 'Рассказ о принципах REST',
        description: 'REST (Representational State Transfer) — это архитектурный стиль...',
        content: 'Полный текст о **Клиент-серверной архитектуре**, **Stateless**, **Кешировании**, **Единообразии интерфейса**...', // Полный текст для страницы поста
        author: { id: 'user-1', name: 'John Doe', avatarUrl: 'https://via.placeholder.com/40' }, // Из users
        timestamp: '2 days ago',
        tags: [ // Из post_tag -> tags
            { id: 'tag-1', name: '#rest' },
            { id: 'tag-2', name: '#api' },
            { id: 'tag-3', name: '#architecture' }
        ],
        resources: [ // Из post_resources -> resources
            { id: 'res-1', title: 'Roy Fielding\'s Dissertation', link: 'https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm' },
            { id: 'res-2', title: 'MDN - HTTP Overview', link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview' }
        ]
    },
    {
        id: 'blog-2',
        title: 'Переменная volatile под капотом Java',
        description: 'Рассмотрим, как ключевое слово volatile обеспечивает видимость изменений переменных между потоками...',
        content: 'Детальное объяснение работы volatile, барьеры памяти, happens-before relationship...',
        author: { id: 'user-2', name: 'Jane Smith', avatarUrl: 'https://via.placeholder.com/40' },
        timestamp: '5 days ago',
        tags: [
            { id: 'tag-4', name: '#java' },
            { id: 'tag-5', name: '#multithreading' },
            { id: 'tag-6', name: '#volatile' }
        ],
        resources: [] // У этого поста нет доп. ресурсов
    },
    // ... другие посты блога
];
// --- End Mock Data ---

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Состояние загрузки

    useEffect(() => {
        // Симуляция загрузки данных
        setLoading(true);
        const timer = setTimeout(() => {
            // Здесь будет ваш fetch('/api/blog-posts')
            setPosts(mockBlogPosts);
            setLoading(false);
        }, 500); // Имитация задержки сети

        return () => clearTimeout(timer); // Очистка таймера при размонтировании
    }, []); // Пустой массив зависимостей - выполнить один раз при монтировании

    return (
        <div className="blog-page">
            <h1>Блог</h1>
            {loading ? (
                <p>Загрузка постов...</p> // Отображение загрузчика
            ) : posts.length > 0 ? (
                <div className="post-list">
                    {posts.map(post => (
                        <PostCard
                            key={post.id}
                            id={post.id} // Передаем id для ссылки
                            author={post.author}
                            timestamp={post.timestamp}
                            title={post.title}
                            description={post.description} // Передаем описание
                            content={post.content}         // и контент
                            tags={post.tags}
                            resources={post.resources}
                            postType="blog" // Указываем тип поста
                        />
                    ))}
                </div>
            ) : (
                <p>В блоге пока нет записей.</p> // Если постов нет
            )}
        </div>
    );
};

export default BlogPage;