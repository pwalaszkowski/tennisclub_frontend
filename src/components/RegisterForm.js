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

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const membershipOptions = ['standard', 'premium', 'vip'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Basic validation
        if (!formData.username || !formData.password || !formData.email) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
            if (response.status === 201) {
                setSuccessMessage('Registration successful!');
                setFormData({
                    username: '',
                    name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    membership_type: '',
                    address: '',
                    password: '',
                });
            }
        } catch (error) {
            setErrorMessage(
                error.response?.data?.detail || 'An error occurred during registration.'
            );
        }
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
                Join Us Today!
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#777' }}>
                Create your Tennis Club account to get started.
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
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
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
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    required
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
                    fullWidth
                    margin="normal"
                    select
                    label="Membership Type"
                    name="membership_type"
                    value={formData.membership_type}
                    onChange={handleChange}
                    variant="outlined"
                >
                    {membershipOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
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
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    variant="outlined"
                    required
                />

                {errorMessage && (
                    <Typography color="error" sx={{ mt: 1 }}>
                        {errorMessage}
                    </Typography>
                )}
                {successMessage && (
                    <Typography color="success" sx={{ mt: 1 }}>
                        {successMessage}
                    </Typography>
                )}
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
                    Register
                </Button>
            </form>
        </Box>
    );
};

export default RegisterForm;