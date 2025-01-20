import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        alert('Logged out successfully!');
        navigate('/login'); // Redirect to login page
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{
                color: 'white',
                backgroundColor: '#d32f2f',
                '&:hover': {
                    backgroundColor: '#b71c1c',
                },
            }}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;