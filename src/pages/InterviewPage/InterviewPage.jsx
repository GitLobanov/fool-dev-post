import React, { useState, useEffect } from 'react';
import PostCard from '../../components/PostCard/PostCard';
import './InterviewPage.css';

// --- Mock Data ---
// Симулируем данные из таблиц: intreview_posts, users
// Теги и ресурсы не добавляем, т.к. их нет в связях схемы для intreview_posts
const mockInterviewPosts = [
    {
        id: 'int-1', // UUID
        title: 'Вопрос: Расскажите про Java Memory Model (JMM)', // Заголовок - это вопрос
        description: 'Основные концепции JMM: happens-before, барьеры памяти, видимость.', // Краткое описание
        content: 'Подробное объяснение JMM, включая инструкции reordering, volatile, final...', // Полный ответ/детали
        author: { id: 'user-1', name: 'John Doe', avatarUrl: 'https://via.placeholder.com/40' },
        timestamp: '1 week ago',
        tags: [], // Нет прямых тегов по схеме
        resources: [] // Нет прямых ресурсов по схеме
        // Сюда можно будет добавить ссылки на связанные тесты или coding_challenges, если понадобится
    },
    {
        id: 'int-2',
        title: 'Вопрос: Основные аннотации Spring Core',
        description: '@Component, @Service, @Repository, @Controller, @Autowired, @Qualifier...',
        content: 'Объяснение каждой аннотации, их назначение и различия. Примеры использования...',
        author: { id: 'user-3', name: 'Admin', avatarUrl: 'https://via.placeholder.com/40' },
        timestamp: '2 weeks ago',
        tags: [],
        resources: []
    },
    {
        id: 'int-3',
        title: 'Тема: Разница между == и equals() в Java',
        description: 'Сравнение примитивов и объектов.',
        content: 'Оператор `==` сравнивает ссылки на объекты (или значения для примитивов). Метод `equals()` предназначен для сравнения объектов по значению (логическому равенству), но его нужно корректно переопределять...',
        author: { id: 'user-1', name: 'John Doe', avatarUrl: 'https://via.placeholder.com/40' },
        timestamp: '3 days ago',
        tags: [],
        resources: []
    },
    // ... другие вопросы/темы интервью
];
// --- End Mock Data ---

const InterviewPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Симуляция fetch('/api/interview-posts')
        const timer = setTimeout(() => {
            setPosts(mockInterviewPosts);
            setLoading(false);
        }, 300); // Чуть быстрее для разнообразия :)

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="interview-page">
            <h1>Вопросы для интервью</h1>
            {loading ? (
                <p>Загрузка вопросов...</p>
            ) : posts.length > 0 ? (
                <div className="post-list">
                    {posts.map(post => (
                        <PostCard
                            key={post.id}
                            id={post.id}
                            author={post.author}
                            timestamp={post.timestamp}
                            title={post.title} // Заголовок - это вопрос
                            description={post.description} // Описание
                            content={post.content}       // Контент - детали ответа
                            tags={post.tags}             // Будет пустым массивом
                            resources={post.resources}     // Будет пустым массивом
                            postType="interviews" // Указываем тип
                        />
                    ))}
                </div>
            ) : (
                <p>Вопросов для интервью пока нет.</p>
            )}
        </div>
    );
};

export default InterviewPage;