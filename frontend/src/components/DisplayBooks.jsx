import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function DisplayBooks() {
  const { id } = useParams();
  const [book, displayBook] = useState({});
  const { addToCart} = useCart();

  useEffect(() => { 
    console.log("Id", id)
    axios
      .get(`http://localhost:5000/book/book/${id}`)
      .then((response) => {
        displayBook(response.data);
      })
      .catch((error) => console.log('Error', error.message));
  }, [id]);

  

  const handleCart=()=>{
    console.log("🔍 Book to be added:", book);

     addToCart(book);
  }

  return (
    <>
      <div className="container display-book-container">
        <div className="book-display-card ">
          <div className="image-card" >
            <img src={book.image} alt={book.title} style={{ width:'400px',
            height: 'auto',
            borderRadius: '12px',
            width: '90%',
            boxShadow:'0 0 12px rgba(0, 0, 0, 0.15)'}} />
          </div>

          <div className="book-info">
            <h2 className="book-title">{book.title}</h2>
            <h5 className="book-author">By: Taxmann's Editorial Board</h5>
            <h4 className="book-price">₹{book.price}</h4>
            <button className="cart-button" onClick={handleCart}>
              Add to Cart <i className="bi bi-cart"></i>
            </button>

            <div className="features mt-4">
              <div>
                <i className="bi bi-truck fs-2 mb-2"></i>
                <p>Free Shipping on orders above ₹500</p>
              </div>
              <div>
                <i className="bi bi-arrow-left-right fs-2 mb-2"></i>
                <p>Easy Return and Exchange</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container about-author mt-5 page-heading">
        <h2>About the Author</h2>
        <h5 className="mt-3">Taxmann Editorial Board</h5>
        <p>
          At the core of Taxmann's commitment to delivering insightful and reliable information is a highly skilled Research & Editorial Team consisting of Chartered Accountants, Company Secretaries, and Lawyers. Guided by Editor-In-Chief Mr Rakesh Bhargava, this team upholds Taxmann's role as a leading content provider in the professional knowledge space.
        </p>
      </div>
    </>
  );
}
