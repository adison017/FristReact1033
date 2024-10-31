import React, { createContext, useContext, useState, useEffect } from 'react';

// สร้าง CartContext
const CartContext = createContext();

// สร้าง CartProvider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [resetCart, setResetCart] = useState(false); // เพิ่ม state สำหรับ resetCart
  const username = localStorage.getItem('username'); // ดึง username จาก localStorage

  // ฟังก์ชันสำหรับเพิ่มสินค้า
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];

      // ตรวจสอบว่ามี orderId อยู่แล้วหรือไม่ ถ้ายังไม่มี ให้สร้างใหม่
      if (!orderId) {
        const newOrderId = generateOrderId();
        setOrderId(newOrderId);
        localStorage.setItem('orderId', newOrderId); // เก็บ orderId ใน localStorage
      }
    }

    setCart(updatedCart);
    localStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart)); // อัปเดตตะกร้าใน localStorage
  };

  // ฟังก์ชันสำหรับสร้างหมายเลขออเดอร์
  const generateOrderId = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `AIDSON${randomNum}`;
  };

  // ฟังก์ชันจัดการตะกร้าอื่น ๆ
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart)); // อัปเดตตะกร้าใน localStorage
  };

  const updateCartQuantity = (id, change) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: Math.max(newQuantity, 1) }; // ห้ามมีจำนวนสินค้าน้อยกว่า 1
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart)); // อัปเดตตะกร้าใน localStorage
  };

  const increaseQuantity = (id) => updateCartQuantity(id, 1);
  const decreaseQuantity = (id) => updateCartQuantity(id, -1);

  const clearCart = () => {
    setCart([]);
    setOrderId('');
    setResetCart(true); // เพิ่มการรีเซ็ต cart เมื่อทำการเคลียร์
    localStorage.removeItem('orderId'); // ลบ orderId จาก localStorage
    localStorage.removeItem(`cart_${username}`); // ลบตะกร้าจาก localStorage
  };

  // ใช้ useEffect เพื่อดึงข้อมูลจาก localStorage เมื่อ component โหลด
  useEffect(() => {
    const storedCart = localStorage.getItem(`cart_${username}`); // ดึงตะกร้าตาม username
    const storedOrderId = localStorage.getItem('orderId');

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      setCart([]); // หากไม่มีตะกร้าก็เซ็ตเป็นอาร์เรย์ว่าง
    }

    if (storedOrderId) {
      setOrderId(storedOrderId);
    } else {
      setOrderId(''); // หากไม่มี orderId ก็เซ็ตให้ว่าง
    }
  }, [username]); // ขึ้นอยู่กับ username

  // ใช้ useEffect เพื่อบันทึกข้อมูลตะกร้าใน localStorage เมื่อ cart เปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem(`cart_${username}`, JSON.stringify(cart.length > 0 ? cart : [])); // บันทึกตะกร้า
  }, [cart, username]); // รวม username ด้วย
  
  return (
    <CartContext.Provider value={{
      cart,
      orderId,
      resetCart,           // ส่ง resetCart ไปด้วย
      setResetCart,       // ส่ง setResetCart ไปด้วย
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// สร้าง hook สำหรับใช้ CartContext
export const useCart = () => {
  return useContext(CartContext);
};
