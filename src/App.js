import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import UsersForm from './components/UsersForm';
import CourtsForm from "./components/CourtsForm";
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ReservationsForm from "./components/ReservationsForm";
import EditProfile from "./components/EditProfile";
import EditCourt from "./components/EditCourt";
import EditReservation from "./components/EditReservation";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/users" element={<UsersForm />} />
                <Route path="/edit-profile/:id" element={<EditProfile />} />
                <Route path="/courts" element={<CourtsForm />} />
                <Route path="/edit-court/:id" element={<EditCourt />} />
                <Route path="/reservations" element={<ReservationsForm />} />
                <Route path="/edit-reservation/:id" element={<EditReservation />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
