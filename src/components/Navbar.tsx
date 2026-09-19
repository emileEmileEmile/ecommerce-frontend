import { Link, useNavigate } from 'react-router-dom';
import { getUserRole } from '../services/authHelper';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const role = getUserRole();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Products</Link>
      {token && <Link to="/cart">Cart</Link>}
      {token && <Link to="/orders">Orders</Link>}
      {role === 'ADMIN' && <Link to="/admin/products">Admin</Link>}
      {!token && <Link to="/login">Login</Link>}
      {!token && <Link to="/register">Register</Link>}
      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}