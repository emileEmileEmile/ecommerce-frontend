import { Navigate } from 'react-router-dom';
import { getUserRole } from '../services/authHelper';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole) {
    const role = getUserRole();
    if (requiredRole !== role) {
        return <Navigate to="/" />;
    }
  }

  return children;


}