import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, TextField } from '@mui/material';
import ApiService from '../services/ApiService';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await ApiService.getUsers();
        setUsers(result.data);
    };

    const deleteUser = async (id) => {
        await ApiService.deleteUser(id);
        loadUsers();
    };

    const addUser = async (e) => {
        e.preventDefault();
        await ApiService.addUser({ firstname, lastname, email });
        setFirstname('');
        setLastname('');
        setEmail('');
        loadUsers();
    };

    return (
        <div>
            <h2>User List</h2>
            <form onSubmit={addUser} style={{ marginBottom: '20px' }}>
                <TextField label="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                <TextField label="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Button type="submit" variant="contained" color="primary">Add User</Button>
            </form>
            {users.map(user => (
                <Card key={user.id} style={{ margin: '10px 0' }}>
                    <CardContent>
                        <Typography variant="h5">{user.firstname} {user.lastname} - {user.email}</Typography>
                        <Link to={`/edit/${user.id}`}>
                            <Button variant="outlined" color="primary">Edit</Button>
                        </Link>
                        <Button variant="contained" color="secondary" onClick={() => deleteUser(user.id)}>Delete</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default UserList;
