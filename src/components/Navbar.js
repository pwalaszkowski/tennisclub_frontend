import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for token in cookies or local storage
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('access='))?.split('=')[1];

        if (token) {
            try {
                jwtDecode(token); // Validate token
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        // Clear cookies (logout logic)
        document.cookie = 'access=; Max-Age=0; path=/;';
        document.cookie = 'refresh=; Max-Age=0; path=/;';
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#4CAF50', py: 2 }}>
            <Toolbar
                sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Logo */}
                <Typography
                    variant="h4"
                    sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}
                >
                    🎾 Tennis Club
                </Typography>

                {/* Navigation Buttons */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        component={Link}
                        to="/home"
                        sx={{
                            fontSize: '1rem',
                            textTransform: 'none',
                            color: 'white',
                            '&:hover': { color: '#FFD700' },
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        component={Link}
                        to="/users"
                        sx={{
                            fontSize: '1rem',
                            textTransform: 'none',
                            color: 'white',
                            '&:hover': { color: '#FFD700' },
                        }}
                    >
                        Members
                    </Button>
                    <Button
                        component={Link}
                        to="/register"
                        sx={{
                            fontSize: '1rem',
                            textTransform: 'none',
                            color: 'white',
                            '&:hover': { color: '#FFD700' },
                        }}
                    >
                        Register
                    </Button>
                    {isLoggedIn ? (
                        <Button
                            onClick={handleLogout}
                            sx={{
                                fontSize: '1rem',
                                textTransform: 'none',
                                color: 'white',
                                '&:hover': { color: '#FFD700' },
                            }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            component={Link}
                            to="/login"
                            sx={{
                                fontSize: '1rem',
                                textTransform: 'none',
                                color: 'white',
                                '&:hover': { color: '#FFD700' },
                            }}
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
