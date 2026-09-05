import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignupUser = () => {
    axios.post(`${API_URL}/auth/signup`, { name: form.name, email: form.email, password: form.password })
      .then(() => {
        // Do not auto-login; require the user to log in explicitly
        toast.success('Signup Successful! Please log in to continue.');
        navigate('/login');
      })
      .catch(e => {
        const errorMsg = e.response?.data?.msg || 'Signup failed!';
        console.log('error', e.message);
        toast.error(errorMsg);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSignupUser();
    setForm({ name: '', email: '', password: '' });
  };

  return (
    <div className="section-dark d-flex align-items-center justify-content-center" style={{ minHeight: '85vh' }}>
      <div className="auth-card">
        <h2 className="auth-title">🔱 VedPath Signup</h2>
        <div className="gold-divider mb-4" />
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            type="text"
            name="name"
            className="input-gold"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="input-gold"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="input-gold"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-gold py-3 mt-2" style={{ borderRadius: '10px', fontSize: '1rem' }}>
            Sign Up
          </button>
          <p className="text-center mt-2" style={{ color: '#9e8a6e', fontSize: '0.9rem' }}>
            Already registered?{' '}
            <Link to="/login" style={{ color: '#d4af37' }}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
