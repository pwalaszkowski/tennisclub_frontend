import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import UsersForm from './components/UsersForm';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/users" element={<UsersForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
