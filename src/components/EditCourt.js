import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';

const EditCourt = () => {
    const { id } = useParams(); // Get the court ID from the URL
    const navigate = useNavigate(); // For navigation after successful edit

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        surface: '',
        lights: false,
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const surfaceOptions = ['Hard', 'Clay', 'Grass'];

    useEffect(() => {
        // Fetch court details for editing
        const fetchCourtDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/courts/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setFormData(response.data); // Populate form with court data
            } catch (error) {
                console.error('Failed to fetch court details:', error);
                setErrorMessage('Failed to load court data.');
            }
        };

        fetchCourtDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, lights: e.target.checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await axios.put(`http://127.0.0.1:8000/api/courts/${id}/`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setSuccessMessage('Court updated successfully!');
            setTimeout(() => navigate('/courts'), 2000); // Redirect after success
        } catch (error) {
            console.error('Failed to update court:', error);
            setErrorMessage(
                error.response?.data?.detail || 'An error occurred while updating the court.'
            );
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 600,
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
                Edit Court
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#777' }}>
                Update the details for this court.
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Court Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    select
                    label="Surface Type"
                    name="surface"
                    value={formData.surface}
                    onChange={handleChange}
                    variant="outlined"
                >
                    {surfaceOptions.map((option) => (
                        <MenuItem key={option} value={option.toLowerCase()}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.lights}
                            onChange={handleCheckboxChange}
                            name="lights"
                        />
                    }
                    label="Lights Available"
                    sx={{ display: 'block', mt: 2, textAlign: 'left' }}
                />

                {errorMessage && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {errorMessage}
                    </Typography>
                )}
                {successMessage && (
                    <Typography color="success" sx={{ mt: 2 }}>
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

export default EditCourt;
