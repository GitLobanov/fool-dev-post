import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import PostCard from '../../components/PostCard/PostCard';
import './LearningSetDetailPage.css';

// --- Mock Data (оставляем как есть) ---
// ... (mockLearningSets, mockBlogPosts, mockInterviewPosts, mockLearningSetPosts) ...
const mockLearningSets = [
    { id: 'set-uuid-1', name: 'Подготовка к Java Core собеседованию', description: 'Все основные темы Java Core: коллекции, многопоточность, ООП, SOLID, Stream API и т.д.' },
    { id: 'set-uuid-2', name: 'Spring Framework Основы', description: 'Ключевые концепции Spring: IoC/DI, AOP, Spring Boot, MVC, Data JPA.' },
    { id: 'set-uuid-3', name: 'REST API Дизайн', description: 'Принципы REST, HATEOAS, версионирование, безопасность API.' },
];
const mockBlogPosts = [
    { id: 'blog-1', title: 'Рассказ о принципах REST', description: '...', content: 'Полный текст о **Клиент-серверной архитектуре**\n\n*   Stateless\n*   Кеширование\n\n ```java\nSystem.out.println("Hello REST!");\n```\nБольше текста...', author: { id: 'user-1', name: 'John Doe'}, timestamp: '2 days ago', tags: [{ id: 'tag-1', name: '#rest' }], resources: [{ id: 'res-1', title: 'Roy Fielding Dissertation', link: '...' }] },
    { id: 'blog-2', title: 'Переменная volatile под капотом Java', description: '...', content: 'Детальное объяснение работы volatile, барьеры памяти, happens-before relationship...\n\n## Пример\n\n```java\nprivate volatile boolean flag = false;\n```\n\nЕще текст...', author: { id: 'user-2', name: 'Jane Smith'}, timestamp: '5 days ago', tags: [{ id: 'tag-4', name: '#java' }, { id: 'tag-5', name: '#multithreading' }], resources: [] },
];
const mockInterviewPosts = [
    { id: 'int-1', title: 'Вопрос: Расскажите про Java Memory Model (JMM)', description: '...', content: 'Подробное объяснение JMM, включая инструкции reordering, volatile, final...\n\n*   Happens-Before\n*   Visibility\n*   Atomicity\n', author: { id: 'user-1', name: 'John Doe'}, timestamp: '1 week ago', tags: [], resources: [] },
    { id: 'int-2', title: 'Вопрос: Основные аннотации Spring Core', description: '...', content: 'Объяснение каждой аннотации:\n\n*   `@Component`\n*   `@Service`\n*   `@Repository`\n*   `@Controller`\n*   `@Autowired`\n*   `@Qualifier`\n\n...', author: { id: 'user-3', name: 'Admin'}, timestamp: '2 weeks ago', tags: [], resources: [] },
    { id: 'int-3', title: 'Тема: Разница между == и equals() в Java', description: '...', content: 'Оператор `==` сравнивает ссылки...\nМетод `equals()` сравнивает по значению...\n\n```java\nString s1 = new String("hello");\nString s2 = new String("hello");\nSystem.out.println(s1 == s2); // false\nSystem.out.println(s1.equals(s2)); // true\n```', author: { id: 'user-1', name: 'John Doe'}, timestamp: '3 days ago', tags: [], resources: [] }
];
const mockLearningSetPosts = [
    { learning_set_id: 'set-uuid-1', post_id: 'blog-2' }, { learning_set_id: 'set-uuid-1', post_id: 'int-1' }, { learning_set_id: 'set-uuid-1', post_id: 'int-3' }, { learning_set_id: 'set-uuid-2', post_id: 'int-2' }, { learning_set_id: 'set-uuid-3', post_id: 'blog-1' },
];
// --- End Mock Data ---

// Новый компонент для отображения поста в расширенном виде
const ExpandedPostItem = ({ post }) => {
    // Определяем тип поста для заголовка
    const postTypeLabel = post.postType === 'blog' ? 'Статья' : 'Вопрос/Тема';

    return (
        <article className="expanded-post-item">
            <header className="expanded-post-header">
                <span className="post-type-label">{postTypeLabel}:</span>
                <h3 className="expanded-post-title">{post.title}</h3>
                {/* Можно добавить мета-информацию (автор, дата), если нужно */}
                <div className="expanded-post-meta">
                    <span>{post.author?.name || 'Unknown'}</span>
                    <span className="separator">|</span>
                    <span>{post.timestamp || ''}</span>
                </div>
            </header>

            {/* Отображение тегов, если есть */}
            {post.tags && post.tags.length > 0 && (
                <div className="post-detail-tags expanded-tags">
                    {post.tags.map(tag => <span key={tag.id || tag.name} className="tag">{tag.name}</span>)}
                </div>
            )}

            <div className="expanded-post-content content-body">
                <ReactMarkdown
                    children={post.content || ''}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                />
            </div>

            {/* Отображение ресурсов, если есть */}
            {post.resources && post.resources.length > 0 && (
                <div className="post-detail-resources expanded-resources">
                    <strong>Доп. ресурсы:</strong>
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
    );
};


const LearningSetDetailPage = () => {
    const {setId} = useParams();
    const [learningSet, setLearningSet] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // === Новое состояние для режима вида ===
    const [viewMode, setViewMode] = useState('compact'); // 'compact' или 'expanded'

    useEffect(() => {
        // ... (логика загрузки данных остается прежней) ...
        setLoading(true);
        setError(null);
        setPosts([]);

        const timer = setTimeout(() => {
            const foundSet = mockLearningSets.find(s => s.id === setId);
            if (!foundSet) {
                setError('Набор обучения не найден.');
                setLoading(false);
                return;
            }
            setLearningSet(foundSet);

            const postIdsInSet = mockLearningSetPosts
                .filter(link => link.learning_set_id === setId)
                .map(link => link.post_id);

            const combinedPosts = postIdsInSet.map(postId => {
                const blogPost = mockBlogPosts.find(p => p.id === postId);
                if (blogPost) return { ...blogPost, postType: 'blog' };
                const interviewPost = mockInterviewPosts.find(p => p.id === postId);
                if (interviewPost) return { ...interviewPost, postType: 'interviews' };
                return null;
            }).filter(Boolean);

            setPosts(combinedPosts);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [setId]);

    // --- Обработчик переключения вида ---
    const handleToggleViewMode = () => {
        setViewMode(prevMode => prevMode === 'compact' ? 'expanded' : 'compact');
    };

    // --- Логика отображения ---
    if (loading && !learningSet) {
        return <div className="post-detail-loading">Загрузка набора обучения...</div>;
    }
    if (error) {
        return <div className="post-detail-error">Ошибка: {error}</div>;
    }
    if (!learningSet) {
        return <div className="post-detail-error">Набор не найден.</div>;
    }

    // --- Рендеринг ---
    return (
        <div className="learning-set-detail-page">
            <Link to="/learning-sets" className="back-link">← Ко всем наборам</Link>

            <header className="learning-set-header">
                <h1>{learningSet.name}</h1>
                {learningSet.description && <p>{learningSet.description}</p>}

                {/* === Переключатель вида === */}
                {posts.length > 0 && !loading && ( // Показываем только если есть посты и не идет загрузка
                    <div className="view-toggle-container">
                        <label htmlFor="view-mode-toggle">
                            <input
                                type="checkbox"
                                id="view-mode-toggle"
                                checked={viewMode === 'expanded'}
                                onChange={handleToggleViewMode}
                            />
                            Показать весь контент сразу
                        </label>
                    </div>
                )}
            </header>

            <div className="learning-set-posts-list">
                {/* Заголовок секции материалов отображаем всегда */}
                <h2>Материалы набора:</h2>

                {/* --- Условный рендеринг списка постов --- */}
                {loading && posts.length === 0 ? (
                    <p>Загрузка материалов...</p>
                ) : posts.length > 0 ? (
                    // В зависимости от viewMode рендерим разное
                    viewMode === 'compact' ? (
                        // --- Компактный вид (как было) ---
                        posts.map(post => (
                            <PostCard
                                key={`${post.postType}-${post.id}`}
                                // ... все пропсы для PostCard ...
                                id={post.id}
                                author={post.author}
                                timestamp={post.timestamp}
                                title={post.title}
                                description={post.description}
                                content={post.content}
                                tags={post.tags}
                                resources={post.resources}
                                postType={post.postType}
                            />
                        ))
                    ) : (
                        // --- Расширенный вид ---
                        <div className="expanded-view-container">
                            {posts.map(post => (
                                <ExpandedPostItem key={`expanded-${post.postType}-${post.id}`} post={post}/>
                            ))}
                        </div>
                    )
                ) : (
                    <p>В этом наборе пока нет материалов.</p>
                )}
            </div>
        </div>
    );
};

export default LearningSetDetailPage;

