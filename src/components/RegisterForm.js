import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box } from '@mui/material';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        last_name: '',
        email: '',
        phone: '',
        membership_type: '',
        address: '',
        password: '',
    });

    const membershipOptions = ['standard', 'premium', 'vip'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/register/', formData);
            alert('User registered successfully!');
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                alert('Error: ' + error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                alert('No response from server. Please try again later.');
            } else {
                // Something happened while setting up the request
                alert('An unexpected error occurred: ' + error.message);
            }
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 500,
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
                Create Your Account
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#777' }}>
                Join the Tennis Club and enjoy exclusive benefits!
            </Typography>
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
                    label="First Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    variant="outlined"
                />
                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Membership Type"
                    name="membership_type"
                    value={formData.membership_type}
                    onChange={handleChange}
                    variant="outlined"
                >
                    {membershipOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Address"
                    name="address"
                    value={formData.address}
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
                        backgroundColor: '#4CAF50',
                        '&:hover': {
                            backgroundColor: '#388E3C',
                        },
                    }}
                >
                    Register
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, color: '#555' }}>
                Already have an account? <a href="/login" style={{ color: '#4CAF50', textDecoration: 'none' }}>Log in here</a>.
            </Typography>
        </Box>
    );
};

export default RegisterForm;
