import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLoginUser = () => {
    axios.post(`${API_URL}/auth/login`, { email: form.email, password: form.password })
      .then(response => {
        const { user, token } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        if (user.email === 'vedpath@gmail.com') {
          toast.success('Welcome Admin');
          login(response.data);
          navigate('/adminpanel');
        } else {
          login(response.data);
          setForm({ email: '', password: '' });
          toast.success('Login successful!');
          setTimeout(() => navigate('/'), 1000);
        }
      })
      .catch(e => {
        toast.error('Login Failed');
        console.log(e.response?.data || e.message);
      });
  };

  const handleSubmit = e => { e.preventDefault(); handleLoginUser(); };

  return (
    <div className="section-dark d-flex align-items-center justify-content-center" style={{ minHeight: '85vh' }}>
      <div className="auth-card">
        <h2 className="auth-title">🔱 VedPath Login</h2>
        <div className="gold-divider mb-4" />
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            type="email"
            name="email"
            className="input-gold"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="input-gold"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit" className="btn-gold py-3 mt-2" style={{ borderRadius: '10px', fontSize: '1rem' }}>
            Login
          </button>
          <p className="text-center mt-2" style={{ color: '#9e8a6e', fontSize: '0.9rem' }}>
            Not registered?{' '}
            <Link to="/signup" style={{ color: '#d4af37' }}>Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
