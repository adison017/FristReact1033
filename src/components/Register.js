import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // นำเข้า styles.css ของคุณ
import { useCart } from '../CartContext';
import Swal from 'sweetalert2';

const Register = ({ setResetCart }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { clearCart } = useCart(); // รับ clearCart จาก useCart

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Passwords do not match!',
                text: 'Please make sure both passwords are the same.',
            });
            return;
        }

        const userData = { username, password, firstName, lastName, email };
        console.log("User Data: ", userData); // ตรวจสอบค่าที่ส่งไปยังเซิร์ฟเวอร์

        const response = await fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'You have successfully registered. Please log in.',
                confirmButtonText: 'OK', // ปุ่มที่ให้ผู้ใช้กดตกลง
            }).then(() => {
                clearCart(); // เคลียร์ตะกร้าสินค้า
                setResetCart(true); // ตั้งค่า resetCart เป็น true
                navigate("/"); // เปลี่ยนไปยังหน้าแรกหลังจากกดตกลง
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'Something went wrong. Please try again.',
            });
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen">
            {/* พื้นหลังที่เบลอ */}
            <div className="absolute inset-0 bg-cover bg-center blur-lg" style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2016/01/27/22/10/shopping-1165437_640.jpg')` }}></div>
            {/* card ที่ไม่เบลอ */}
            <div className="card w-96 bg-white shadow-2xl z-20 opacity-90">
                <div className="card-body">
                    <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter your first name"
                                className="input input-bordered w-full border-2 border-blue-300 focus:border-blue-500 focus:outline-none transition duration-300"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter your last name"
                                className="input input-bordered w-full border-2 border-blue-300 focus:border-blue-500 focus:outline-none transition duration-300"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="input input-bordered w-full border-2 border-blue-300 focus:border-blue-500 focus:outline-none transition duration-300"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="input input-bordered w-full border-2 border-blue-300 focus:border-blue-500 focus:outline-none transition duration-300"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="input input-bordered w-full border-2 border-blue-300 focus:border-blue-500 focus:outline-none transition duration-300"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="input input-bordered w-full border-2 border-blue-300 focus:border-blue-500 focus:outline-none transition duration-300"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button type="submit" className="btn btn-primary w-full hover:bg-blue-700 transition duration-300">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;