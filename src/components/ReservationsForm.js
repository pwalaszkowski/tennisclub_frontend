import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import axios from 'axios';

const ReservationsForm = () => {
    const [reservations, setReservations] = useState([]); // Reservation data
    const [courts, setCourts] = useState([]); // Court data for dropdown
    const [newReservation, setNewReservation] = useState({
        court: '',
        date: '',
        start_time: '',
        end_time: '',
    });

    // Fetch courts and reservations
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch courts
                const courtsResponse = await axios.get('http://127.0.0.1:8000/api/courts/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setCourts(courtsResponse.data);

                // Fetch reservations
                const reservationsResponse = await axios.get('http://127.0.0.1:8000/api/reservations/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setReservations(reservationsResponse.data);
            } catch (err) {
                console.error('Failed to fetch data:', err);
            }
        };

        fetchData();
    }, []);

    // Handle adding a new reservation
    const handleAddReservation = async () => {
        const { court, date, start_time, end_time } = newReservation;
        if (!court || !date || !start_time || !end_time) {
            alert('Please fill out all fields.');
            return;
        }
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/reservations/',
                newReservation,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                }
            );
            setReservations([...reservations, response.data]); // Add new reservation
            setNewReservation({ court: '', date: '', start_time: '', end_time: '' }); // Reset form
        } catch (err) {
            console.error('Failed to add reservation:', err);
        }
    };

    // Handle deleting a reservation
    const handleDeleteReservation = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/reservations/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setReservations(reservations.filter((res) => res.id !== id)); // Remove reservation
        } catch (err) {
            console.error('Failed to delete reservation:', err);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 1200,
                margin: 'auto',
                mt: 6,
                p: 4,
                border: '1px solid #ddd',
                borderRadius: 3,
                backgroundColor: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Typography variant="h3" gutterBottom sx={{ color: '#4CAF50', fontWeight: 700 }}>
                Reservations Management
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#777', fontSize: '1rem' }}>
                Below is the list of all reservations. You can add, edit, or delete them.
            </Typography>

            {/* Add Reservation Form */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <FormControl fullWidth>
                    <InputLabel>Court</InputLabel>
                    <Select
                        name="court"
                        value={newReservation.court}
                        onChange={(e) => setNewReservation({ ...newReservation, court: e.target.value })}
                    >
                        {courts.map((court) => (
                            <MenuItem key={court.id} value={court.id}>
                                {court.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Date"
                    name="date"
                    type="date"
                    value={newReservation.date}
                    onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
                <TextField
                    label="Start Time"
                    name="start_time"
                    type="time"
                    value={newReservation.start_time}
                    onChange={(e) => setNewReservation({ ...newReservation, start_time: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
                <TextField
                    label="End Time"
                    name="end_time"
                    type="time"
                    value={newReservation.end_time}
                    onChange={(e) => setNewReservation({ ...newReservation, end_time: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddReservation}
                    sx={{ alignSelf: 'center',
                          color: 'white'}}
                >
                    Add Reservation
                </Button>
            </Box>

            {/* Reservations Table */}
            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Court</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Start Time</strong></TableCell>
                            <TableCell><strong>End Time</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.map((res) => (
                            <TableRow key={res.id}>
                                <TableCell>{courts.find((court) => court.id === res.court)?.name || 'N/A'}</TableCell>
                                <TableCell>{res.date}</TableCell>
                                <TableCell>{res.start_time}</TableCell>
                                <TableCell>{res.end_time}</TableCell>
                                <TableCell>
                                    {/* Edit Button */}
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        sx={{ mr: 1 }}
                                        onClick={() => alert(`Edit reservation ${res.id}`)}
                                    >
                                        Edit
                                    </Button>
                                    {/* Delete Button */}
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteReservation(res.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ReservationsForm;
