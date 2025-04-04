import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './InterviewDetailPage.css'; // Можно переиспользовать стили BlogPostPage или создать свои

// --- Mock Data (Возьмем из InterviewPage) ---
const mockInterviewPosts = [
    { id: 'int-1', title: 'Вопрос: Расскажите про Java Memory Model (JMM)', description: '...', content: 'Подробное объяснение JMM, включая инструкции reordering, volatile, final... Много деталей и нюансов для полного понимания.', author: { id: 'user-1', name: 'John Doe', avatarUrl: 'https://via.placeholder.com/40' }, timestamp: '1 week ago', tags: [], resources: [] },
    { id: 'int-2', title: 'Вопрос: Основные аннотации Spring Core', description: '...', content: 'Объяснение каждой аннотации (@Component, @Service, @Repository, @Controller, @Autowired, @Qualifier...), их назначение и различия. Примеры использования в Spring приложениях.', author: { id: 'user-3', name: 'Admin', avatarUrl: 'https://via.placeholder.com/40' }, timestamp: '2 weeks ago', tags: [], resources: [] },
    { id: 'int-3', title: 'Тема: Разница между == и equals() в Java', description: '...', content: 'Оператор `==` сравнивает ссылки на объекты (или значения для примитивов). Метод `equals()` предназначен для сравнения объектов по значению (логическому равенству), но его нужно корректно переопределять с соблюдением контракта (рефлексивность, симметричность, транзитивность, консистентность, сравнение с null).', author: { id: 'user-1', name: 'John Doe', avatarUrl: 'https://via.placeholder.com/40' }, timestamp: '3 days ago', tags: [], resources: [] }
];
// --- End Mock Data ---


const InterviewDetailPage = () => {
    const { interviewId } = useParams(); // Получаем interviewId
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
                    <img src={interviewPost.author?.avatarUrl || "https://via.placeholder.com/30"} alt={interviewPost.author?.name} className="author-avatar-small"/>
                    <span>Добавил: {interviewPost.author?.name || 'Unknown'}</span>
                    <span className="separator">|</span>
                    <span>{interviewPost.timestamp || 'Дата неизвестна'}</span>
                </div>

                {/* Здесь тегов и ресурсов нет по схеме, но если появятся - добавить */}

                {/* Основной контент - ответ/детали */}
                <div className="content-body" dangerouslySetInnerHTML={{ __html: interviewPost.content.replace(/\n/g, '<br />') }}>
                    {/* Опять же, лучше Markdown рендерер */}
                </div>

            </article>
            {/* Здесь можно добавить ссылки на связанные тесты/задачи или комментарии */}
        </div>
    );
};

export default InterviewDetailPage;