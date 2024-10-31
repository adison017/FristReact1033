import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderStatus from './components/OrderStatus';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';
import { useCart } from './CartContext';

const App = () => {
  const [username, setUsername] = useState(null);
  const { clearCart } = useCart();
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อทำการนำทาง
  const [resetCart, setResetCart] = useState(false); // เพิ่ม state resetCart และ setResetCart

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (resetCart) {
      clearCart(); // ล้างตะกร้าเมื่อ resetCart เป็น true
      setResetCart(false); // รีเซ็ต resetCart เป็น false หลังจากล้างตะกร้าเสร็จ
    }
  }, [resetCart, clearCart]);

  const handleLogin = (user) => {
    setUsername(user);
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'หากออกจากระบบ สินค้าในตะกร้าจะหายไป!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ออกจากระบบ',
      cancelButtonText: 'ไม่, ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        setUsername(null); // รีเซ็ต username เป็น null
        localStorage.removeItem('username'); // ลบ username จาก localStorage
        clearCart(); // ล้างตะกร้า
        navigate('/'); // นำทางไปที่เส้นทาง '/'
      }
    });
  };

  return (
      <div>
        {/* แสดง Header เฉพาะเมื่อมี username */}
        {username && <Header username={username} onLogout={handleLogout} />}

        <Routes>
          <Route path="/register" element={<Register setResetCart={setResetCart} />} /> {/* ส่งผ่าน setResetCart ไปยัง Register */}

          {username ? (
              <>
                <Route path="/productList" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart username={username} />} />
                <Route path="/checkout" element={<Checkout username={username} />} />
                <Route path="/order-status" element={<OrderStatus />} />
                <Route path="/account" element={<Account />} />
              </>
          ) : (
              <Route path="/" element={<Login onLogin={handleLogin} />} />
          )}
        </Routes>

        {/* แสดง Footer เฉพาะเมื่อมีการล็อกอิน */}
        {username && <Footer />}
      </div>
  );
};

export default App;