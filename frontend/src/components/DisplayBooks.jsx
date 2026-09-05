import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
const API_URL = import.meta.env.VITE_API_URL;

export default function DisplayBooks() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`${API_URL}/book/book/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.log('Error', err.message));
  }, [id]);

  return (
    <div className="section-dark py-5 px-3">
      <div className="container">
        {/* Book Card */}
        <div className="glass-card p-4 p-md-5 mb-5">
          <div className="row align-items-center g-4">
            <div className="col-md-5 text-center">
              <img src={book.image} alt={book.title}
                className="img-fluid rounded-3"
                style={{ maxHeight: '380px', objectFit: 'contain', boxShadow: '0 0 30px rgba(212,175,55,0.15)' }} />
            </div>
            <div className="col-md-7">
              <h2 className="font-cinzel fw-bold mb-3" style={{ color: '#f5e6c8', fontSize: 'clamp(1.3rem, 3vw, 1.9rem)' }}>
                {book.title}
              </h2>
              <h5 className="mb-2" style={{ color: '#9e8a6e' }}>By: Taxmann's Editorial Board</h5>
              <h4 className="fw-bold mb-4" style={{ color: '#d4af37', fontSize: '1.6rem' }}>₹{book.price}</h4>
              <button className="btn-gold px-5 py-3 mb-4" style={{ borderRadius: '10px', fontSize: '1rem' }} onClick={() => addToCart(book)}>
                <i className="bi bi-cart me-2" />Add to Cart
              </button>
              <div className="d-flex gap-4 mt-2">
                <div className="text-center">
                  <i className="bi bi-truck fs-2 mb-1 d-block" style={{ color: '#d4af37' }} />
                  <p style={{ color: '#9e8a6e', fontSize: '0.8rem' }}>Free Shipping above ₹500</p>
                </div>
                <div className="text-center">
                  <i className="bi bi-arrow-left-right fs-2 mb-1 d-block" style={{ color: '#d4af37' }} />
                  <p style={{ color: '#9e8a6e', fontSize: '0.8rem' }}>Easy Return & Exchange</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Author */}
        <div className="glass-card p-4 p-md-5">
          <h2 className="font-cinzel fw-bold mb-3" style={{ color: '#d4af37' }}>About the Author</h2>
          <div className="gold-divider mb-4" style={{ margin: '0 0 1.5rem 0' }} />
          <h5 className="fw-semibold mb-3" style={{ color: '#f5e6c8' }}>Taxmann Editorial Board</h5>
          <p style={{ color: '#9e8a6e', lineHeight: 1.8 }}>
            At the core of Taxmann's commitment to delivering insightful and reliable information is a highly skilled
            Research & Editorial Team consisting of Chartered Accountants, Company Secretaries, and Lawyers.
            Guided by Editor-In-Chief Mr Rakesh Bhargava, this team upholds Taxmann's role as a leading content
            provider in the professional knowledge space.
          </p>
        </div>
      </div>
    </div>
  );
}
