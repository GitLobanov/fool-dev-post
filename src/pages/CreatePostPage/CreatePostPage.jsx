import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import "@uiw/react-md-editor/markdown-editor.css";
import './CreatePostPage.css';


const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('**Начните писать здесь!**');
    const [tags, setTags] = useState('');

    // Placeholder для обработчика Markdown
    function handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
        setContent(text); // Сохраняем Markdown текст
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Логика отправки данных на сервер
        console.log({
            title,
            description,
            content,
            tags: tags.split(',').map(tag => tag.trim()).filter(Boolean) // Преобразуем строку в массив
        });
        alert('Пост опубликован (в консоли)!');
        // Редирект или очистка формы
    };

    return (
        <div className="create-post-page">
            <h1>Создание нового поста</h1>
            <form onSubmit={handleSubmit} className="create-post-form">
                <div className="form-group">
                    <label htmlFor="post-title">Заголовок</label>
                    <input
                        type="text"
                        id="post-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Введите заголовок поста"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="post-description">Краткое описание (для превью)</label>
                    <textarea
                        id="post-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        placeholder="Краткое описание, которое будет видно в ленте"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="post-content">Основной контент (Markdown)</label>
                    {/* --- Заменяем textarea на MDEditor --- */}
                    <MDEditor
                        value={content}
                        onChange={setContent} // Передаем setContent напрямую
                        height={400}          // Задаем высоту редактора
                        preview="live"        // Включаем живое превью (или 'edit', 'preview')
                        // Другие опции: https://github.com/uiwjs/react-md-editor#options-props
                    />
                    {/* --- --- */}
                </div>

                <div className="form-group">
                    <label htmlFor="post-tags">Теги (через запятую)</label>
                    <input
                        type="text"
                        id="post-tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="например: react, typescript, webdev"
                    />
                </div>

                {/* Здесь можно добавить секцию для тестов/live coding, если нужно */}

                <button type="submit" className="publish-button">
                    Опубликовать пост
                </button>
            </form>
        </div>
    );
};

export default CreatePostPage;