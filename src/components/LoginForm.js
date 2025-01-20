import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in by verifying the presence of a token
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            setIsLoggedIn(true); // Update login state
            alert('Logged in successfully!');
            navigate(response.data.redirect_to || '/home'); // Redirect dynamically
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid username or password');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsLoggedIn(false); // Update login state
        alert('Logged out successfully!');
        navigate('/'); // Redirect to home or login page
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                margin: 'auto',
                mt: 6,
                p: 4,
                border: '1px solid #ddd',
                borderRadius: 3,
                backgroundColor: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ color: '#4CAF50', fontWeight: 700 }}>
                {isLoggedIn ? 'Welcome!' : 'Welcome Back!'}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#777' }}>
                {isLoggedIn
                    ? 'You are logged in. Manage your account or explore more.'
                    : 'Please login to access your Tennis Club account.'}
            </Typography>
            {!isLoggedIn ? (
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        variant="outlined"
                    />
                    {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.5,
                            fontSize: '1rem',
                            borderRadius: 20,
                            color: 'white',
                            backgroundColor: '#4CAF50',
                            '&:hover': {
                                backgroundColor: '#388E3C',
                            },
                        }}
                    >
                        Login
                    </Button>
                </form>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                    fullWidth
                    sx={{
                        mt: 3,
                        py: 1.5,
                        fontSize: '1rem',
                        borderRadius: 20,
                        color: 'white',
                        backgroundColor: '#d32f2f',
                        '&:hover': {
                            backgroundColor: '#b71c1c',
                        },
                    }}
                >
                    Logout
                </Button>
            )}
        </Box>
    );
};

export default LoginForm;
