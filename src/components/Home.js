import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const Home = () => {
    return (
        <Box
            sx={{
                maxWidth: 800,
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
            <Typography variant="h3" gutterBottom sx={{ color: '#4CAF50', fontWeight: 700 }}>
                Welcome to Tennis Club!
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#777', fontSize: '1.2rem' }}>
                Your one-stop platform for managing memberships, booking courts, and staying updated
                on the latest events. Whether you're a beginner or a seasoned player, we’ve got
                something for everyone.
            </Typography>
        </Box>
    );
};

export default Home;
