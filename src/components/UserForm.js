import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import ApiService from '../services/ApiService';

const UserForm = ({ user = {}, onSubmit }) => {
    const [firstname, setFirstname] = useState(user.firstname || '');
    const [lastname, setLastname] = useState(user.lastname || '');
    const [email, setEmail] = useState(user.email || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { firstname, lastname, email };

        if (user.id) {
            newUser.id = user.id;
            await ApiService.updateUser(newUser);
        } else {
            await ApiService.addUser(newUser);
        }

        // Reset form fields
        setFirstname('');
        setLastname('');
        setEmail('');
        
        // Call onSubmit to reload user list
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <TextField label="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
            <TextField label="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
    );
};

export default UserForm;
