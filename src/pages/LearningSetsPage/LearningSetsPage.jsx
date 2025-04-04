import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LearningSetsPage.css'; // Создаем CSS

// --- Mock Data ---
// Симулируем данные из learning_sets
// Добавляем name и description, т.к. они нужны для UI, хоть и нет в схеме
const mockLearningSets = [
    { id: 'set-uuid-1', name: 'Подготовка к Java Core собеседованию', description: 'Все основные темы Java Core: коллекции, многопоточность, ООП, SOLID, Stream API и т.д.' },
    { id: 'set-uuid-2', name: 'Spring Framework Основы', description: 'Ключевые концепции Spring: IoC/DI, AOP, Spring Boot, MVC, Data JPA.' },
    { id: 'set-uuid-3', name: 'REST API Дизайн', description: 'Принципы REST, HATEOAS, версионирование, безопасность API.' },
    // ... другие наборы
];
// --- End Mock Data ---

const LearningSetsPage = () => {
    const [sets, setSets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Имитация fetch('/api/learning-sets')
        const timer = setTimeout(() => {
            setSets(mockLearningSets);
            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="learning-sets-page">
            <h1>Наборы обучения</h1>

            {loading ? (
                <p>Загрузка наборов...</p>
            ) : sets.length > 0 ? (
                <ul className="learning-set-list">
                    {sets.map(set => (
                        <li key={set.id} className="learning-set-item">
                            {/* Оборачиваем в Link для перехода на детальную страницу */}
                            <Link to={`/learning-sets/${set.id}`} className="learning-set-link">
                                <h2>{set.name}</h2>
                                {set.description && <p>{set.description}</p>}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Наборы обучения пока не созданы.</p>
            )}
        </div>
    );
};

export default LearningSetsPage;