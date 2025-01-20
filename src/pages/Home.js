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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    mt: 4,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        py: 1.5,
                        px: 4,
                        fontSize: '1rem',
                        borderRadius: 20,
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#388E3C',
                        },
                    }}
                >
                    Book a Court
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                        py: 1.5,
                        px: 4,
                        fontSize: '1rem',
                        borderRadius: 20,
                        borderColor: '#4CAF50',
                        color: '#4CAF50',
                        '&:hover': {
                            backgroundColor: '#E8F5E9',
                        },
                    }}
                >
                    View Memberships
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
