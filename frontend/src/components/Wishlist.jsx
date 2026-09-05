import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;

export default function Wishlist() {
  const [books, setBooks] = useState([]);
  const { isLoggedIn } = useAuth();
  const { user } = useAuth();
  const userId = user?._id || user?.id;
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const fetchWishlist = async () => {
    const res = await axios.get(`${API_URL}/wishlist/userwishlist/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setBooks(res.data.data);
  };

  const handleAddCart = (book) => {
    if (isLoggedIn) return addToCart(book);
    toast.error('Please Signup to add item to cart');
    setTimeout(() => navigate('/signup'), 1100);
  };

  useEffect(() => { if (userId) fetchWishlist(); }, [userId]);

  return (
    <div className="section-dark py-5 px-3" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h3 className="font-cinzel fw-bold mb-5 d-flex align-items-center gap-2 px-4 py-3"
          style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px', color: '#d4af37' }}>
          <i className="bi bi-heart-fill" /> My Wishlist
        </h3>

        {books.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-heart" style={{ fontSize: '3rem', color: '#9e8a6e' }} />
            <p className="mt-3" style={{ color: '#9e8a6e' }}>No items in Wishlist.</p>
          </div>
        ) : (
          <div className="row justify-content-center g-4">
            {books.map(book => (
              <div key={book._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div className="glass-card h-100 d-flex flex-column">
                  <img src={book.image} alt={book.title} className="w-100 object-fit-cover" style={{ height: '220px' }} />
                  <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
                    <div>
                      <h6 className="font-cinzel fw-semibold mb-1" style={{ color: '#f5e6c8', fontSize: '0.85rem' }}>{book.title}</h6>
                      <p className="fw-bold mb-3" style={{ color: '#d4af37' }}>₹{book.price}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn-gold flex-fill py-2" style={{ fontSize: '0.8rem', borderRadius: '8px' }} onClick={() => handleAddCart(book)}>
                        <i className="bi bi-cart me-1" />Cart
                      </button>
                      <button className="btn-gold-outline flex-fill py-2" style={{ fontSize: '0.8rem', borderRadius: '8px' }} onClick={() => navigate(`/book/${book.productId}`)}>
                        View More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
