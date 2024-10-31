import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Checkout = ({ orderId, cart, username, onOrderConfirmed, clearCart }) => {
  const [address, setAddress] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log('Username received in Checkout:', username); // เช็คค่า username ที่ได้รับจาก props

  const handleCheckout = async () => {
    if (!address) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกที่อยู่',
        text: 'ที่อยู่จัดส่งเป็นสิ่งจำเป็นสำหรับการสั่งซื้อ',
        showConfirmButton: true,
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    setIsConfirmed(true);
    setLoading(true);

    const orderItems = cart.map(product => ({
      product_Name: product.name,
      quantity: product.quantity,
      price: product.price
    }));

    const orderData = {
      username: username || 'Guest', // ใช้ username ที่ล็อกอิน หรือ "Guest" ถ้าไม่มี
      orderNumber: orderId,
      status: null,
      orderItems: orderItems,
      address: address
    };

    console.log('Order data being sent:', orderData);

    try {
      // ส่งคำสั่งซื้อ
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Order submission failed: ${response.statusText}`);
      }

      const result = await response.json();

      // ลดจำนวนสินค้าตามคำสั่งซื้อ
      await Promise.all(
        cart.map(async (product) => {
          const decreaseResponse = await fetch('http://localhost:8080/api/Products/decrease', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              name: product.name,
              stock: product.quantity, // ส่ง quantity แทน stock
            }),
          });

          if (!decreaseResponse.ok) {
            throw new Error(`Failed to decrease product ${product.name}: ${decreaseResponse.statusText}`);
          }
        })
      );

      // แจ้งเตือนการสั่งซื้อที่สำเร็จ
      Swal.fire({
        icon: 'success',
        title: 'การสั่งซื้อของคุณได้รับการยืนยัน!',
        text: `หมายเลขคำสั่งซื้อของคุณคือ ${orderId} และที่อยู่สำหรับจัดส่งคือ ${address}`,
        showConfirmButton: true,
        confirmButtonText: 'ตกลง'
      }).then((result) => {
        if (result.isConfirmed) {
          onOrderConfirmed();
          clearCart();
        }
      });
      console.log('Order submitted successfully:', result);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: error.message || 'กรุณาลองใหม่อีกครั้ง',
        showConfirmButton: true,
        confirmButtonText: 'ตกลง'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold">Checkout</h1>
      <input
        id="address"
        type="text"
        placeholder="กรุณากรอกที่อยู่"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="input input-bordered w-full"
      />

      <button
        onClick={handleCheckout}
        className="btn btn-primary mt-2"
        disabled={isConfirmed || loading}
      >
        {loading ? 'กำลังยืนยัน...' : (isConfirmed ? 'ยืนยันแล้ว' : 'ยืนยันการสั่งซื้อ')}
      </button>
      {loading && (
        <span className="loading loading-ball loading-lg mt-2"></span>
      )}
    </div>
  );
};

export default Checkout;
