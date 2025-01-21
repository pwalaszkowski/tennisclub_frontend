import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import axios from 'axios';

const EditReservation = () => {
    const { id } = useParams(); // Get reservation ID from URL
    const navigate = useNavigate(); // Navigate after successful edit

    const [reservationData, setReservationData] = useState({
        court: '',
        date: '',
        start_time: '',
        end_time: '',
    });
    const [courts, setCourts] = useState([]); // Court data for dropdown
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Fetch reservation and court data
        const fetchData = async () => {
            try {
                // Fetch courts
                const courtsResponse = await axios.get('http://127.0.0.1:8000/api/courts/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setCourts(courtsResponse.data);

                // Fetch reservation details
                const reservationResponse = await axios.get(
                    `http://127.0.0.1:8000/api/reservations/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        },
                    }
                );
                setReservationData(reservationResponse.data);
            } catch (err) {
                console.error('Failed to fetch data:', err);
                setErrorMessage('Failed to load reservation data.');
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservationData({ ...reservationData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await axios.put(
                `http://127.0.0.1:8000/api/reservations/${id}/`,
                reservationData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                }
            );
            setSuccessMessage('Reservation updated successfully!');
            setTimeout(() => navigate('/reservations'), 2000); // Redirect after success
        } catch (err) {
            console.error('Failed to update reservation:', err);
            setErrorMessage(
                err.response?.data?.detail || 'An error occurred while updating the reservation.'
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
                Edit Reservation
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#777' }}>
                Update the details for this reservation.
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Court</InputLabel>
                    <Select
                        name="court"
                        value={reservationData.court}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {courts.map((court) => (
                            <MenuItem key={court.id} value={court.id}>
                                {court.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Date"
                    name="date"
                    type="date"
                    value={reservationData.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Start Time"
                    name="start_time"
                    type="time"
                    value={reservationData.start_time}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="End Time"
                    name="end_time"
                    type="time"
                    value={reservationData.end_time}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
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

export default EditReservation;
