import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL;

// we are passing id and onClose as props:
export default function DisplayTrendingBooks({id, onClose}) {
  const [trending, setTrending] = useState({});
  // const { id } = useParams();
  const {addToCart} = useCart();
  const {isLoggedIn} = useAuth(); //context API
  const navigate  = useNavigate();


  useEffect(() => {
    axios.get(`${API_URL}/trending/trending/${id}`)
      .then((response) => {
        setTrending(response.data);
      })
      .catch((err) => console.log("Error", err.message));
  }, [id]);

  const handleCart=()=>{
    if(isLoggedIn) return addToCart(trending);
    toast.error("Please Login to add item to Cart");
    setTimeout(()=> navigate("/login"), 1000);
  }

  return (
    <>
        <div className="trending-overlay">
  <div className="trending-card-popup trending-animate-in">
    <button className="trending-close-btn" onClick={onClose}>
      <i className="bi bi-x-lg fs-2"></i>
    </button>

    <div className="trending-popup-content">
      <div className="trending-left">
        <img src={trending.image} alt={trending.title} />
      </div>

      <div className="trending-right">
        <h3 className="book-title">{trending.title}</h3>
        <h5 className="book-author">By: {trending.author}</h5>
        <p className="fw-bold book-price">Rs. {trending.price}</p>
        <button className="cart-button" onClick={handleCart}>Add to Cart</button>
        <div className="rating mt-2">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`bi ${i < trending.rating ? 'bi-star-fill' : 'bi-star'}`}
              style={{
                color: i < trending.rating ? '#FFD700' : '#ccc',
                fontSize: '1.4rem',
              }}
            ></i>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
