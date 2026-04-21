import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ChatBox from './components/ChatBox.jsx';
import VideoChat from './components/VideoChat.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="/" element={
                    <>
                        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                        <Home />
                        <Footer />
                        <ChatBox />
                        <VideoChat />
                    </>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}