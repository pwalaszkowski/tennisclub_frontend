import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#4CAF50',
                color: 'white',
                textAlign: 'center',
                py: 3,
                mt: 4,
            }}
        >
            <Typography variant="h6" gutterBottom>
                🎾 Tennis Club
            </Typography>
            <Typography variant="body2" gutterBottom>
                © {new Date().getFullYear()} Tennis Club. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;