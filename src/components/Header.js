import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../CartContext'; // นำเข้า useCart เพื่อเข้าถึง cart context
import '@fortawesome/fontawesome-free/css/all.min.css'; // นำเข้า Font Awesome

const Header = ({ username, onLogout }) => {
  const { cart } = useCart(); // ใช้ useCart เพื่อเข้าถึง cart
  const location = useLocation(); // ใช้ useLocation เพื่อตรวจสอบ path ปัจจุบัน

  // คำนวณจำนวนสินค้าในตะกร้า
  const totalItems = cart.reduce((total, product) => total + product.quantity, 0);

  // ฟังก์ชันเพื่อตรวจสอบว่า path ปัจจุบันตรงกับที่กำหนดหรือไม่
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Ruay Online Store</h1>
        <nav className="flex-grow text-center">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link 
                to="/productList" 
                className={`${
                  isActive('/') ? 'text-yellow-400 border-b-2 border-yellow-400' : 'hover:text-yellow-400 border-b-2 border-transparent hover:border-yellow-400'
                } pb-1`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/order-status" 
                className={`${
                  isActive('/order-status') ? 'text-yellow-400 border-b-2 border-yellow-400' : 'hover:text-yellow-400 border-b-2 border-transparent hover:border-yellow-400'
                } pb-1`}
              >
                Order Status
              </Link>
            </li>
            <li>
              <Link 
                to="/account" 
                className={`${
                  isActive('/account') ? 'text-yellow-400 border-b-2 border-yellow-400' : 'hover:text-yellow-400 border-b-2 border-transparent hover:border-yellow-400'
                } pb-1`}
              >
                Account
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center ml-auto"> {/* ใช้ ml-auto เพื่อย้ายไอคอนไปทางขวาสุด */}
          <Link to="/cart" className="hover:text-gray-300 flex items-center">
            <i className="fas fa-shopping-cart text-white text-2xl mr-1"></i> {/* ขยายขนาดไอคอน */}
            {totalItems > 0 && (
              <span className="bg-red-600 text-white text-xs rounded-full px-2">{totalItems}</span>
            )}
          </Link>
          {username && (
            <div className="text-lg flex items-center mx-5">
              <span>Hi! {username}</span>
              <button onClick={onLogout} className="btn btn-danger ml-2">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
