import React from 'react';
import CreatePost from '../components/post/CreatePost';

const CreatePostPage = () => {
    const categories = ['Web', 'Mobile', 'DevOps'];
    const tags = ['React', 'JavaScript', 'Backend', 'Frontend'];

    return (
        <div>
            <h2>Создать пост</h2>
            <CreatePost categories={categories} tags={tags} />
        </div>
    );
};

export default CreatePostPage;