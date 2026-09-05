import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;

export default function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;

    axios.get(`${API_URL}/book/getbooks`)
      .then(res => setBooks(res.data))
      .catch(err => console.log(err.message));

    if (userId) {
      axios.get(`${API_URL}/wishlist/userwishlist/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(res => setWishlistIds(res.data.data.map(item => item.productId)))
        .catch(e => console.log('Error', e.message));
    }
  }, []);

  const handleAddCart = (book) => {
    if (isLoggedIn) return addToCart(book);
    toast.error('Please Signup to add item to cart');
    setTimeout(() => navigate('/signup'), 1100);
  };

  const handleWishlist = async (book) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;
    if (!userId) { toast.error('Please login first'); return; }
    try {
      const res = await axios.post(`${API_URL}/wishlist/togglewishlist`, {
        productId: book._id, title: book.title, author: book.author,
        image: book.image, price: book.price, userId,
      }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

      if (res.data.msg.includes('Added to wishlist')) {
        setWishlistIds(prev => [...prev, book._id]);
        toast.success('Added to wishlist');
      } else {
        setWishlistIds(prev => prev.filter(id => id !== book._id));
        toast.info('Removed from wishlist');
      }
    } catch { toast.error('Error updating wishlist'); }
  };

  const filtered = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="section-dark py-5 px-3" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="section-heading mb-2">Sacred Books</h1>
        <div className="gold-divider mt-2 mb-4" />
        <div className="mx-auto" style={{ maxWidth: '420px' }}>
          <input
            className="input-gold"
            type="search"
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍  Search by title..."
          />
        </div>
      </div>

      {/* Grid */}
      <div className="container">
        <div className="row justify-content-center g-4">
          {filtered.map(book => (
            <div key={book._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div className="glass-card h-100 d-flex flex-column position-relative">
                {/* Wishlist */}
                <div className="wishlist-icon" onClick={() => handleWishlist(book)}>
                  <i className={`bi ${wishlistIds.includes(book._id) ? 'bi-heart-fill text-danger' : 'bi-heart'}`}
                    style={{ color: wishlistIds.includes(book._id) ? '' : '#9e8a6e' }} />
                </div>
                <img src={book.image} alt={book.title} className="w-100 object-fit-cover" style={{ height: '220px' }} />
                <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
                  <div>
                    <h6 className="font-cinzel fw-semibold mb-1" style={{ color: '#f5e6c8', fontSize: '0.85rem', lineHeight: 1.4 }}>
                      {book.title}
                    </h6>
                    <p className="fw-bold mb-3" style={{ color: '#d4af37', fontSize: '1rem' }}>₹{book.price}</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn-gold flex-fill py-2" style={{ fontSize: '0.8rem', borderRadius: '8px' }} onClick={() => handleAddCart(book)}>
                      <i className="bi bi-cart me-1" />Cart
                    </button>
                    <button className="btn-gold-outline flex-fill py-2" style={{ fontSize: '0.8rem', borderRadius: '8px' }} onClick={() => navigate(`/book/${book._id}`)}>
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
