// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ username, children }) => {
  if (!username) {
    return <Navigate to="/login" replace />; // redirect ไปหน้า login ถ้าไม่มี username
  }

  return children; // แสดง children ถ้ามี username
};

export default ProtectedRoute;
