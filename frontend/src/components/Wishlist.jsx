import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import {useAuth} from '../context/AuthContext'
import ThemeContext from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Wishlist() {

    const [books,setBooks] = useState([]);
    const {isLoggedIn} = useAuth();
    const {user} = useAuth();
    const {theme} = useContext(ThemeContext);
    const userId = user?._id || user?.id;
    const navigate = useNavigate();
    const {addToCart} = useCart();


    const handleWishlist=async()=>{
      const response = await axios.get(`http://localhost:5000/wishlist/userwishlist/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setBooks(response.data.data);
        console.log(response.data);
    }

    const handleAddCart=(book)=>{
        if(isLoggedIn) return addToCart(book);
        toast.error("Please Signup to add item to cart");
    
        setTimeout(()=> //using setimeout so that user will be able to read toast
         navigate("/signup")
        , 1100);
    }

    const handleSubmit=(id)=>{
       console.log("Navigating to DisplayBooks with id:", id);
       navigate(`/book/${id}`);
   }

    useEffect(()=>{
       if(userId){
          handleWishlist();
       }
    },[userId])

  return (
    <>
      <div>
      <h3 className="container my-5 p-4 d-flex align-items-center" style={{width:'100%', height:'4rem', backgroundColor:'#3E2723', color:'white'}}><i className="bi bi-heart-fill"></i> &nbsp;My Wishlist</h3>
           <div className="row  justify-content-center mb-5" style={{overflow:'hidden'}}>

             {books.length===0? (
                <h6 className="container ps-5 ms-3">No items in Wishlist.</h6>
             )
            :(
                  books
                    .map((book)=>
                        ( <div className="card col-md-6 col-lg-4 col-sm-12 g-3" style={{margin:'0.4rem'}} key={book._id}>
                            <img src={book.image} className="card-img-top" alt="Vedic Book Image" style={{ height: '250px', objectFit: 'cover' }} />
                            <div className="card-body mt-auto" >
                              <h5 className="card-title">{book.title}</h5>
                              <p className="card-price">₹{book.price}</p>
                              <div className="books-btn" style={{display:'flex', gap:'5px'}}>
                                <button className="btn book-btn" onClick={()=>handleAddCart(book)}> <i className="bi bi-cart"></i>Cart</button>
                                <button className="btn book-btn" onClick={()=>handleSubmit(book.productId)}>View More</button>
                              </div>
                            </div>
                        </div>
                   )))
            }
          </div> 
      </div>
    </>
  )
  
}
