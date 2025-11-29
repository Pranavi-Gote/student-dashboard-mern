import React, { useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert("Login Failed! ❌ Check your email or password.");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🎓</h1>
        <h2 style={{ marginBottom: '20px' }}>Student Login</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>Welcome back! Please enter your details.</p>
        
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;