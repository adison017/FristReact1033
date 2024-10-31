import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Account = () => {
  const [accountInfo, setAccountInfo] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      const fetchAccountInfo = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/users/username/${username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch account info');
          }

          const data = await response.json();
          setAccountInfo({
            ...data,
            password: '', // ทำให้ฟิลด์รหัสผ่านเป็นค่าว่าง
          });

        } catch (error) {
          console.error('Error fetching account info', error);
        }
      };

      fetchAccountInfo();
    } else {
      console.error('No username found in localStorage');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo({ ...accountInfo, [name]: value || '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountInfo),
      });

      if (!response.ok) {
        throw new Error('Failed to update account info');
      }

      Swal.fire({
        title: 'Complete!',
        text: 'Account information updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error updating account info', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update account information.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
      <div className="flex justify-center mt-10">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Account Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={accountInfo.username || ''}
                    onChange={handleChange}
                    className="input input-bordered"
                    disabled
                />
              </div>
              <div className="form-control">
                <label className="label">New Password:</label>
                <div className="relative">
                  <input
                      type="password"
                      name="password"
                      value={accountInfo.password || ''}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="Enter new password"
                  />
                  <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="form-control">
                <label className="label">First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={accountInfo.firstName || ''}
                    onChange={handleChange}
                    className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={accountInfo.lastName || ''}
                    onChange={handleChange}
                    className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={accountInfo.email || ''}
                    onChange={handleChange}
                    className="input input-bordered"
                />
              </div>
              <div className="card-actions justify-end mt-4">
                <button type="submit" className="btn btn-primary">Update Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Account;