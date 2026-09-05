import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL;

export default function DisplayTrendingBooks({ id, onClose }) {
  const [trending, setTrending] = useState({});
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/trending/trending/${id}`)
      .then(res => setTrending(res.data))
      .catch(err => console.log('Error', err.message));
  }, [id]);

  const handleCart = () => {
    if (isLoggedIn) return addToCart(trending);
    toast.error('Please Login to add item to Cart');
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className="glass-card p-4 position-relative"
        style={{ maxWidth: '680px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="position-absolute top-0 end-0 m-3 bg-transparent border-0"
          style={{ color: '#d4af37', fontSize: '1.5rem', cursor: 'pointer', zIndex: 2 }}
        >
          <i className="bi bi-x-lg" />
        </button>

        <div className="row g-4 align-items-center">
          <div className="col-sm-5 text-center">
            <img src={trending.image} alt={trending.title}
              className="img-fluid rounded-3" style={{ maxHeight: '240px', objectFit: 'contain' }} />
          </div>
          <div className="col-sm-7">
            <h3 className="font-cinzel fw-bold mb-2" style={{ color: '#f5e6c8', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>
              {trending.title}
            </h3>
            <h5 className="mb-2" style={{ color: '#9e8a6e', fontSize: '0.95rem' }}>By: {trending.author}</h5>
            <p className="fw-bold mb-3" style={{ color: '#d4af37', fontSize: '1.4rem' }}>₹{trending.price}</p>
            <div className="d-flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`bi ${i < trending.rating ? 'bi-star-fill' : 'bi-star'}`}
                  style={{ color: i < trending.rating ? '#FFD700' : '#555', fontSize: '1.1rem' }} />
              ))}
            </div>
            <button className="btn-gold px-4 py-2" style={{ borderRadius: '10px' }} onClick={handleCart}>
              <i className="bi bi-cart me-2" />Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
