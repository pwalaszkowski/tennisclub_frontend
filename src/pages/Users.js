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
} from '@mui/material';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]); // State to store user data

    useEffect(() => {
        // Fetch users from API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Include token
                    },
                });
                setUsers(response.data); // Update state with user data
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };

        fetchUsers();
    }, []);

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
                User Management
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: '#777', fontSize: '1rem' }}>
                Below is the list of all registered users. You can edit or delete their profiles.
            </Typography>

            {/* User Table */}
            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Phone</strong></TableCell>
                            <TableCell><strong>Membership Type</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{`${user.name} ${user.last_name}`}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.membership_type}</TableCell>
                                <TableCell>
                                    {/* Edit Button */}
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        sx={{ mr: 1 }}
                                        onClick={() => alert(`Edit user ${user.id}`)}
                                    >
                                        Edit
                                    </Button>
                                    {/* Delete Button */}
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => alert(`Delete user ${user.id}`)}
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

export default Users;
