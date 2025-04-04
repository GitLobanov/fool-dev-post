import React, { useState } from 'react';
// import LeftSidebar from '../components/LeftSidebar'; // Сайдбары будут в App.js для общего макета
// import RightSidebar from '../components/RightSidebar';
import PostCard from '../../components/PostCard/PostCard';
import './HomePage.css'; // Стили для специфики HomePage

// Пример данных для постов (оставляем)
const samplePosts = [
    { id: 1, author: 'John Doe', timestamp: '1 hour ago', title: 'Принципы REST', tags: ['#rest', '#principles'], content: '**Клиент-серверная архитектура**: Клиент и сервер работают независимо друг от друга... **Stateless (Отсутствие состояния)**: Сервер не сохраняет информацию о состоянии клиента между запросами... **Кеширование**: В REST API сервер может запомнить результаты частых запросов... **Единообразие интерфейса**: В API используются стандартные команды (GET, POST, PUT, DELETE)... **Многоуровневость системы**: Система может быть разделена на несколько слоев... **Код по требованию**: Иногда сервер может отправлять клиенту код...' },
    { id: 2, author: 'John Doe', timestamp: '3 hours ago', title: 'Зрелости RESTfull сервиса', tags: ['#rest'], content: 'Модель зрелости Ричардсона описывает уровни RESTful веб-сервисов... Уровень 0: The Swamp of POX (Plain Old XML)... Уровень 1: Resources... Уровень 2: HTTP Verbs... Уровень 3: Hypermedia Controls (HATEOAS)...' },
];


const HomePage = () => {
    const [activeTab, setActiveTab] = useState('following'); // 'following', 'top', 'trending'

    return (
        // Обертка для основного контента этой страницы
        <div className="homepage-content">
            {/* Табы для сортировки ленты */}
            <div className="feed-tabs">
                <button
                    className={`tab-btn ${activeTab === 'following' ? 'active' : ''}`}
                    onClick={() => setActiveTab('following')}
                >
                    Следую
                </button>
                <button
                    className={`tab-btn ${activeTab === 'top' ? 'active' : ''}`}
                    onClick={() => setActiveTab('top')}
                >
                    Топ
                </button>
                <button
                    className={`tab-btn ${activeTab === 'trending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('trending')}
                >
                    Стремительные
                </button>
            </div>

            {/* Лента постов */}
            <div className="post-feed">
                {/* Логика фильтрации постов */}
                {samplePosts.map(post => (
                    <PostCard
                        key={post.id}
                        author={post.author}
                        timestamp={post.timestamp}
                        title={post.title}
                        tags={post.tags}
                        content={post.content}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;