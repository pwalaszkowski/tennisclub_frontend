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
    Checkbox,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    InputAdornment,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

const CourtsForm = () => {
    const [courts, setCourts] = useState([]); // State to store court data
    const [newCourt, setNewCourt] = useState({
        name: '',
        location: '',
        surface: '',
        lights: false,
    }); // State to store form data

    const surfaceOptions = ['Hard', 'Clay', 'Grass']; // Surface options for dropdown

    // Fetch courts from API
    useEffect(() => {
        const fetchCourts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/courts/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setCourts(response.data); // Update courts state
            } catch (err) {
                console.error('Failed to fetch courts:', err);
            }
        };

        fetchCourts();
    }, []);

    // Handle adding a new court
    const handleAddCourt = async () => {
        if (!newCourt.name || !newCourt.location || !newCourt.surface) {
            alert('Please fill out all fields before adding a court.');
            return;
        }
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/courts/',
                newCourt,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                }
            );
            setCourts([...courts, response.data]); // Add new court to list
            setNewCourt({ name: '', location: '', surface: '', lights: false }); // Reset form
        } catch (err) {
            console.error('Failed to add court:', err);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourt({ ...newCourt, [name]: value });
    };

    // Handle lights checkbox change
    const handleCheckboxChange = (e) => {
        setNewCourt({ ...newCourt, lights: e.target.checked });
    };

    // Clear a specific field
    const handleClearField = (field) => {
        setNewCourt({ ...newCourt, [field]: '' });
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
                Court Management
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#777', fontSize: '1rem' }}>
                Below is the list of all courts. You can add, edit, or delete them.
            </Typography>

            {/* Add Court Form */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <TextField
                    label="Court Name"
                    name="name"
                    value={newCourt.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        endAdornment: newCourt.name && (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleClearField('name')}>
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Location"
                    name="location"
                    value={newCourt.location}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        endAdornment: newCourt.location && (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleClearField('location')}>
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <FormControl fullWidth>
                    <InputLabel>Surface Type</InputLabel>
                    <Select
                        name="surface"
                        value={newCourt.surface}
                        onChange={handleInputChange}
                        variant="outlined"
                        displayEmpty
                    >
                        {surfaceOptions.map((option) => (
                            <MenuItem key={option} value={option.toLowerCase()}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={newCourt.lights}
                            onChange={handleCheckboxChange}
                            name="lights"
                        />
                    }
                    label="Lights Available"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddCourt}
                    sx={{ alignSelf: 'center', color: 'white' }}
                >
                    Add Court
                </Button>
            </Box>

            {/* Court Table */}
            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Location</strong></TableCell>
                            <TableCell><strong>Surface</strong></TableCell>
                            <TableCell><strong>Lights</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courts.map((court) => (
                            <TableRow key={court.id}>
                                <TableCell>{court.name}</TableCell>
                                <TableCell>{court.location}</TableCell>
                                <TableCell>{court.surface}</TableCell>
                                <TableCell>{court.lights ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    {/* Edit Button */}
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        sx={{ mr: 1 }}
                                        onClick={() => alert(`Edit court ${court.id}`)}
                                    >
                                        Edit
                                    </Button>
                                    {/* Delete Button */}
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => alert(`Delete court ${court.id}`)}
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

export default CourtsForm;
