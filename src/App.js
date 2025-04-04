import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import RightSidebar from './components/RightSidebar/RightSidebar';
import HomePage from './pages/HomePage/HomePage';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import BlogPage from './pages/BlogPage/BlogPage';
import InterviewPage from './pages/InterviewPage/InterviewPage';
import BlogPostPage from './pages/BlogPostPage/BlogPostPage';
import InterviewDetailPage from './pages/InterviewDetailPage/InterviewDetailPage';
import './styles/global.css';
import './App.css';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="page-container">
                <div className="main-layout">
                    <div className="left-sidebar-container">
                        <LeftSidebar />
                    </div>
                    <main className="main-content-area">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/create-post" element={<CreatePostPage />} />
                            {/* Блог */}
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:postId" element={<BlogPostPage />} /> {/* <-- Детальная страница блога */}
                            {/* Интервью */}
                            <Route path="/interviews" element={<InterviewPage />} />
                            <Route path="/interviews/:interviewId" element={<InterviewDetailPage />} /> {/* <-- Детальная страница интервью */}
                        </Routes>
                    </main>
                    <div className="right-sidebar-container">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;