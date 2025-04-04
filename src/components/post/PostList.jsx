import React, { useState, useEffect} from 'react';
import { fetchPosts } from '../../api';
import LikeButton from "../LikeButton";
import {Link} from "react-router-dom";
import PostFilter from "./PostFilter";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        tag: '',
    });

    // useEffect(() => {
    //     setLoading(true);
    //     setError('');
    //
    //     fetchPosts(page)
    //         .then((data) => {
    //             if (Array.isArray(data)) {
    //                 setPosts(data);
    //                 setTotalPages(1);
    //             } else {
    //                 setPosts([]);
    //                 setTotalPages(1);
    //             }
    //         })
    //         .catch((err) => {
    //             setError('Ошибка загрузки постов');
    //             setPosts([]);
    //         })
    //         .finally(() => setLoading(false));
    // }, [page]);

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            setError('');

            try {
                const data = await fetchPosts(page, filters.search, filters.category, filters.tag);
                if (data && Array.isArray(data)) {
                    setPosts(data);
                    setTotalPages(1);
                } else {
                    setPosts([]);
                    setTotalPages(1);
                }
            } catch (err) {
                setError('Ошибка загрузки постов');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [page, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPage(1);
    };


    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Все посты</h2>
            <PostFilter onFilter={handleFilterChange} />
            <ul>
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.id}>
                            <Link to={`/posts/${post.id}`}> {/* Ссылка на страницу поста */}
                                <h3>{post.title}</h3>
                                <p>{post.content.substring(0, 100)}...</p>
                            </Link>
                            <LikeButton postId={post.id} userId="currentUserId"/>
                        </li>
                    ))
                ) : (
                    <p>Нет постов</p>
                )}
            </ul>
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Назад
                </button>
                <span>Страница {page} из {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                    Вперед
                </button>
            </div>
        </div>
    );
};

export default PostList;