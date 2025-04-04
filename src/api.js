import axios, {get} from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Укажите URL вашего бэкенда
});

export const fetchPosts = async (page, search = '', category = '', tag = '') => {
    const response = await axios.get('/api/posts/search', {
        params: { page, title: search, category, tags: tag },
    });
    console.log(response);
    return response.data;
};

export const fetchAuthors = async () => {
    const response = await api.get('/authors');
    return response.data;
};

export const createPost = async (post) => {
    const response = await api.post('/posts', post);
    return response.data;
};