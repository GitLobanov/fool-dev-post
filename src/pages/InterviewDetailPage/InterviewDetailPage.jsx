import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import './InterviewDetailPage.css';

// --- Mock Data (Возьмем из InterviewPage) ---
const mockInterviewPosts = [
    {
        id: 'int-1',
        title: 'Вопрос: Расскажите про Java Memory Model (JMM)',
        description: '...',
        content: 'Подробное объяснение JMM, включая инструкции reordering, volatile, final... Много деталей и нюансов для полного понимания.',
        author: {id: 'user-1', name: 'John Doe', avatarUrl: 'https://via.placeholder.com/40'},
        timestamp: '1 week ago',
        tags: [],
        resources: []
    },
    {
        id: 'int-2',
        title: 'Вопрос: Основные аннотации Spring Core',
        description: '...',
        content: 'Объяснение каждой аннотации (@Component, @Service, @Repository, @Controller, @Autowired, @Qualifier...), их назначение и различия. Примеры использования в Spring приложениях.',
        author: {id: 'user-3', name: 'Admin', avatarUrl: 'https://via.placeholder.com/40'},
        timestamp: '2 weeks ago',
        tags: [],
        resources: []
    },
    {
        id: 'int-3',
        title: 'Тема: Разница между == и equals() в Java',
        description: '...',
        content: 'Оператор `==` сравнивает ссылки... Метод `equals()` сравнивает по значению... \n```java String s1 = new String("hello"); \nString s2 = new String("hello"); \nSystem.out.println(s1 == s2); // false \nSystem.out.println(s1.equals(s2)); // true```',
        author: {id: 'user-1', name: 'John Doe', avatarUrl: 'https://via.placeholder.com/40'},
        timestamp: '3 days ago',
        tags: [],
        resources: []
    }
];


const InterviewDetailPage = () => {
    const {interviewId} = useParams(); // Получаем interviewId
    const [interviewPost, setInterviewPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        // Имитация API запроса
        const timer = setTimeout(() => {
            const foundPost = mockInterviewPosts.find(p => p.id === interviewId);
            if (foundPost) {
                setInterviewPost(foundPost);
            } else {
                setError('Вопрос/Тема интервью не найден(а).');
            }
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [interviewId]); // Зависимость от ID

    if (loading) {
        return <div className="post-detail-loading">Загрузка вопроса...</div>;
    }

    if (error) {
        return <div className="post-detail-error">Ошибка: {error}</div>;
    }

    if (!interviewPost) {
        return <div className="post-detail-error">Вопрос не найден.</div>;
    }

    return (
        <div className="interview-detail-page post-detail-container"> {/* Используем общие стили контейнера */}
            <Link to="/interviews" className="back-link">← Назад к вопросам</Link>

            <article className="post-full-content">
                <h1>{interviewPost.title}</h1> {/* Заголовок - это сам вопрос/тема */}

                <div className="post-detail-meta">
                    <img src={interviewPost.author?.avatarUrl || "https://via.placeholder.com/30"}
                         alt={interviewPost.author?.name} className="author-avatar-small"/>
                    <span>Добавил: {interviewPost.author?.name || 'Unknown'}</span>
                    <span className="separator">|</span>
                    <span>{interviewPost.timestamp || 'Дата неизвестна'}</span>
                </div>

                {/* Здесь тегов и ресурсов нет по схеме, но если появятся - добавить */}

                {/* Основной контент - ответ/детали */}
                <div className="content-body">
                    <ReactMarkdown
                        children={interviewPost.content}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                    />
                </div>

            </article>
            {/* Здесь можно добавить ссылки на связанные тесты/задачи или комментарии */}
        </div>
    );
};

export default InterviewDetailPage;