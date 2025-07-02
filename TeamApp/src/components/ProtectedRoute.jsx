// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const teamInfo = JSON.parse(localStorage.getItem('teamInfo'));
  return teamInfo ? children : <Navigate to="/login" />;
}
