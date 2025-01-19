import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#4CAF50', py: 2 }}>
            <Toolbar
                sx={{
                    flexDirection: 'column', // Arrange items in a column
                    alignItems: 'center', // Center the content horizontally
                    justifyContent: 'center', // Center the content vertically
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
                        to="/"
                        sx={{
                            fontSize: '1rem',
                            textTransform: 'none',
                            color: 'white', // Set link text color to white
                            '&:hover': { color: '#FFD700' }, // Optional hover color
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        component={Link}
                        to="/register"
                        sx={{
                            fontSize: '1rem',
                            textTransform: 'none',
                            color: 'white', // Set link text color to white
                            '&:hover': { color: '#FFD700' }, // Optional hover color
                        }}
                    >
                        Register
                    </Button>
                    <Button
                        component={Link}
                        to="/login"
                        sx={{
                            fontSize: '1rem',
                            textTransform: 'none',
                            color: 'white', // Set link text color to white
                            '&:hover': { color: '#FFD700' }, // Optional hover color
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
