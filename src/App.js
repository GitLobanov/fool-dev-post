import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import AuthorsPage from './pages/AuthorsPage';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from "./components/Navbar";
import PostDetail from "./components/post/PostDetail";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create-post" element={<CreatePostPage />} />
                <Route path="/authors" element={<AuthorsPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/posts/:postId" element={<PostDetail />} />
            </Routes>
        </Router>
    );
}

export default App;