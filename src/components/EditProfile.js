import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Typography, Box } from '@mui/material';
import axios from 'axios';

const EditProfile = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const navigate = useNavigate(); // For navigation after successful edit

    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        email: '',
        phone: '',
        membership_type: '',
        address: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const membershipOptions = ['standard', 'premium', 'vip'];

    useEffect(() => {
        // Fetch user details for editing
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setFormData(response.data); // Populate form with user data
            } catch (error) {
                console.error('Failed to fetch user details:', error);
                setErrorMessage('Failed to load user data.');
            }
        };

        fetchUserDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await axios.put(`http://127.0.0.1:8000/api/users/${id}/`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => navigate('/users'), 2000); // Redirect after success
        } catch (error) {
            console.error('Failed to update profile:', error);
            setErrorMessage(
                error.response?.data?.detail || 'An error occurred while updating the profile.'
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
                Edit Profile
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#777' }}>
                Update your account details below.
            </Typography>
            <form onSubmit={handleSubmit}>
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
                    Save Changes
                </Button>
            </form>
        </Box>
    );
};

export default EditProfile;
