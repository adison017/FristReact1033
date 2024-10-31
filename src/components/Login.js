// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // นำเข้า SweetAlert2
import './styles.css'; // นำเข้า styles.css ของคุณ

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:8080/api/users/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                const data = await response.text();
                console.log(data);
                localStorage.setItem("username", username);
                onLogin(username);
    
                // แสดง SweetAlert เมื่อเข้าสู่ระบบสำเร็จ
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You have successfully logged in!',
                    confirmButtonText: 'OK', // ข้อความปุ่มเป็น "OK" หรือ "ตกลง"
                }).then(() => {
                    // หลังจากผู้ใช้กด "ตกลง" ค่อยเปิดหน้าถัดไป
                    navigate("/productList");
                });
    
            } else {
                // แสดง SweetAlert เมื่อเข้าสู่ระบบไม่สำเร็จ
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid username or password',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            console.error("Error logging in:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred. Please try again later.',
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
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="w-48 h-auto mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">Login</h2>
                    <form onSubmit={handleSubmit}>
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
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full border-2 border-blue-300 focus:border-blue-500 focus:outline-none transition duration-300"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 3C5.58 3 2 8 2 10c0 2 3.58 7 8 7s8-5 8-7-3.58-7-8-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                                            <path d="M10 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 3C5.58 3 2 8 2 10c0 2 3.58 7 8 7s8-5 8-7-3.58-7-8-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" clipRule="evenodd" />
                                            <path d="M10 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <button type="submit" className="btn btn-primary w-full hover:bg-blue-700 transition duration-300">
                                Login
                            </button>
                        </div>
                    </form>
                    {/* เพิ่มลิงก์ลงทะเบียน */}
                    <div className="mt-4 text-center">
                        <p>ยังไม่มีบัญชีใช่ไหม? <button onClick={() => navigate("/register")} className="text-blue-500 cursor-pointer">ลงทะเบียนที่นี่</button></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
