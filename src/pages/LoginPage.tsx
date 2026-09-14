import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login({ email, password });
      localStorage.setItem('access_token',response.access_token);
      navigate('/');

    } catch (err) {
      setError('Invalid Email or Password');

    }

  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>
        
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>

  );





}