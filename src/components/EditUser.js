import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const result = await ApiService.getUserById(id);
            const user = result.data;
            setFirstname(user.firstname);
            setLastname(user.lastname);
            setEmail(user.email);
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = { id, firstname, lastname, email };
        await ApiService.updateUser(updatedUser);
        navigate('/'); // กลับไปที่หน้า User List หลังจากอัปเดต
    };

    return (
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="Firstname"
                />
                <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Lastname"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditUser;
