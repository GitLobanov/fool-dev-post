import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Comments = ({postId}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        axios.get(`/api/comments/post/${postId}`).then((response) => {
            setComments(response.data);
        });
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('/api/comments', {
            postId,
            author: 'Аноним', // Замените на текущего пользователя
            content: newComment,
        });
        setComments([...comments, response.data]);
        setNewComment('');
    };

    return (
        <div>
            <h3>Комментарии</h3>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Добавить комментарий"
            />
            <button type="submit">Отправить</button>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <strong>{comment.author}</strong>: {comment.content}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
            </form>
        </div>
    );
};

export default Comments;