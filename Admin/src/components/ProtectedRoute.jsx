import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
  return adminInfo ? children : <Navigate to="/login" />;
}
