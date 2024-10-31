import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const username = localStorage.getItem('username'); // ดึง username จาก localStorage
  console.log('Username received in status:', username);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/orders/user/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch order status');
        }

        const data = await response.json();
        console.log('Fetched orders:', data); // เพิ่มการ log เพื่อตรวจสอบข้อมูลคำสั่งซื้อ
        setOrders(data);
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };

    if (username) {
      fetchOrders();
    }
  }, [username]);

  // ฟังก์ชันเพื่อกำหนดสีตัวหนังสือของสถานะ
  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-orange-500'; // สีฟ้า
      case 'In Transit':
        return 'text-blue-500'; // สีส้ม
      case 'Delivered':
        return 'text-green-700'; // สีเขียวเข้ม
      default:
        return 'text-gray-500'; // สีเทา
    }
  };

  // ฟังก์ชันสำหรับจัดการเมื่อคลิกปุ่ม "ได้รับสินค้าแล้ว"
  const handleReceivedClick = async (orderNumber) => {
    const result = await Swal.fire({
      title: 'ยืนยันการได้รับสินค้า',
      text: 'คุณแน่ใจหรือไม่ว่าคุณได้รับสินค้าทั้งหมดแล้ว?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่',
    });

    if (result.isConfirmed) {
      try {
        const orderUpdateRequest = {
          orderNumber: orderNumber,
          status: 'Delivered', // เปลี่ยนสถานะเป็น Delivered
        };

        const response = await fetch('http://localhost:8080/api/orders/updateStatus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderUpdateRequest),
        });

        if (!response.ok) {
          throw new Error('Failed to update order status');
        }

        const message = await response.text();
        console.log(message); // แสดงข้อความจากเซิร์ฟเวอร์

        // อัปเดตสถานะใน UI
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.orderNumber === orderNumber ? { ...order, status: 'Delivered' } : order
            )
        );

        Swal.fire('สำเร็จ!', 'สถานะคำสั่งซื้อของคุณได้ถูกอัปเดตแล้ว!', 'success');
      } catch (error) {
        console.error('Error updating order status:', error);
        Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถอัปเดตสถานะคำสั่งซื้อได้', 'error');
      }
    }
  };

  // ฟังก์ชันสำหรับกำหนดสีพื้นหลังและสีขอบของการ์ดตามสถานะ
  const getCardClasses = (status) => {
    switch (status) {
      case 'In Transit':
        return 'bg-blue-100 border-blue-300'; // สีฟ้า
      case 'Delivered':
        return 'bg-green-100 border-green-300';
      case 'Pending':
        return 'bg-yellow-100 border-yellow-300'//
      default:
        return 'bg-red-100 border-red-300'; // สีแดงสำหรับสถานะอื่นๆ
    }
  };

  return (
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Order Status</h2>
        {orders.length === 0 ? (
            <p className="text-center">You have no orders.</p>
        ) : (
            <div className="grid grid-cols-1 gap-6">
              {orders.map((order, index) => (
                  <div
                      key={order.orderNumber || index}
                      className={`card shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105 border-2 ${getCardClasses(order.status)}`}
                  >
                    <h3 className="font-semibold text-lg mb-2">
                      Order Number: <span className="font-bold">{order.orderNumber}</span>
                    </h3>
                    <p className="mb-2">
                      Status: <span className={`badge ${getStatusTextColor(order.status)}`}>{order.status}</span>
                    </p>
                    <p>Total Amount: <span className="font-bold">${order.totalAmount}</span></p>
                    {order.status === 'In Transit' && (
                        <button
                            onClick={() => handleReceivedClick(order.orderNumber)}
                            className="btn btn-primary mt-4"
                        >
                          ได้รับสินค้าแล้ว
                        </button>
                    )}
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default OrderStatus;
