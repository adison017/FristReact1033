import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import Checkout from './Checkout';

const Cart = ({ username, resetCart }) => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const [orderId, setOrderId] = useState('');
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  useEffect(() => {
    // เมื่อผู้ใช้ลงทะเบียนเสร็จสิ้น จะทำการเคลียร์ตะกร้าสินค้า
    if (resetCart) {
      clearCart();
    }
  }, [resetCart, clearCart]); // เพิ่ม `resetCart` ลงใน dependency array

  useEffect(() => {
    if (cart.length > 0) {
      const storedOrderId = localStorage.getItem('orderId');
      if (!storedOrderId) {
        const randomId = `ADISON${Math.floor(Math.random() * 100000)}`;
        setOrderId(randomId);
        localStorage.setItem('orderId', randomId);
      } else {
        setOrderId(storedOrderId);
      }
    } else {
      setOrderId('');
      localStorage.removeItem('orderId');
    }
  }, [cart, username]); 

  const handleOrderConfirmation = () => {
    setIsOrderConfirmed(true);
    localStorage.removeItem('orderId');
    setOrderId('');
  };

  const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">ตะกร้าสินค้า</h1>
        {cart.length > 0 && !isOrderConfirmed && (
          <span className="text-xl text-gray-600">{`หมายเลขคำสั่งซื้อ: ${orderId}`}</span>
        )}
      </div>
   
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">ไม่มีสินค้าที่อยู่ในตะกร้า</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((product) => (
              <li key={product.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                <div>
                  <h2 className="font-bold text-lg">{product.name}</h2>
                  <p className="text-gray-700">{`Price: $${product.price}`}</p>
                  <p className="text-gray-500">{`Quantity: ${product.quantity}`}</p>
                </div>
                <div className="flex items-center">
                  <button 
                    className="btn btn-secondary btn-outline" 
                    onClick={() => increaseQuantity(product.id)}
                  >
                    +
                  </button>
                  <p className="mx-2">{product.quantity}</p>
                  <button 
                    className="btn btn-secondary btn-outline" 
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    -
                  </button>
                  <button 
                    className="btn btn-danger ml-4" 
                    onClick={() => removeFromCart(product.id)}
                  >
                    ลบ
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right mt-4">
            <h3 className="text-lg font-bold">ยอดรวมสินค้าทั้งหมด: ${totalAmount.toFixed(2)}</h3>
          </div>

          <div className="text-center mt-4">
            <button 
              className="btn btn-secondary"
              onClick={clearCart}
            >
              เคลียร์ตะกร้า
            </button>
          </div>
          <div className="text-center mt-4">
            <Checkout 
              orderId={orderId} 
              cart={cart} 
              onOrderConfirmed={handleOrderConfirmation} 
              clearCart={clearCart}
              username={username}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
