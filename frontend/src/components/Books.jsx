import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;

export default function Books() {
   const navigate = useNavigate();
   const[books,setBooks] = useState([]);
   const[search, setSearch] = useState('');
   const {addToCart} = useCart();    //using context APi
   const {isLoggedIn} = useAuth();  //using context APi
   const [wishlistIds, setWishlistIds] = useState([]);

   useEffect(()=>{
    
       const token = localStorage.getItem('token'); // get JWT token
        console.log(token)
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?._id;

        // 1. fetch books
       axios.get(`${API_URL}/book/getbooks`)
      .then((response)=>{
          console.log(response.data);
          setBooks(response.data)})
      .catch((error)=>console.log(error.message))


      //2. fetch wishlist --- so that the heart icon remain red for books which r stored in db
      if(userId){
         axios.get(`${API_URL}/wishlist/userwishlist/${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
         .then((response)=>{
             const productIds = response.data.data.map((item)=>item.productId)
             setWishlistIds(productIds);
         })
         .catch((e)=>console.log("Error",e.message));
      }


   },[])
  

   const handleChange=(e)=>{
      setSearch(e.target.value);
   }


   const handleSubmit=(id)=>{
       navigate(`/book/${id}`);
   }


   const handleAddCart=(book)=>{
     if(isLoggedIn) return addToCart(book);
     toast.error("Please Signup to add item to cart");

     setTimeout(()=> //using setimeout so that user will be able to read toast
       navigate("/signup")
     , 1100);
    }


    //----WISHLIST --- add wishlist items to db (toggle logic define in backend)----
  const handleWishlist = async (book) => {
    console.log("Wishlist clicked for:", book.title); // for checking
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

  if (!userId) {
    toast.error("Please login first");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/wishlist/togglewishlist", {
      productId: book._id,
      title: book.title,
      author: book.author,
      image: book.image,
      price: book.price,
      userId,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (res.data.msg.includes("Added to wishlist")) {
       setWishlistIds((prev) => [...prev, book._id]); // Add to local state ✅
       toast.success("Added to wishlist");
    } else if (res.data.msg.includes("Removed from wishlist")) {
       setWishlistIds((prev) => prev.filter((id) => id !== book._id)); // Remove ✅
       toast.info("Removed from wishlist");
    }
  } catch (err) {
       console.log("Wishlist error:", err.message);
       toast.error("Error updating wishlist");
  }
};

  return (
    <>
            <div id="booking-container">
                <div className="booking-card">
                  {/* search bar */}
                  <div className="d-flex justify-content-center mt-2">
                    <form className="d-flex m-4 w-50 justify-content-center align-items-center" role="search" style={{overflow:'hidden'}}>
                        <input className="form-control me-2 mt-3 outline-dark" type="search" onChange={handleChange} placeholder="Search by Title" aria-label="Search" style={{border:' black 1px solid'}} />
                    </form>
                  </div>
                  
                  {/* card */}
                  <div className="row justify-content-center" style={{overflow:'hidden'}}>
                    {books
                    .filter((book)=>book.title.toLowerCase().includes(search.toLowerCase()))
                    .map((book)=>{
                        return(
                          <div className="card col-md-6 col-lg-4 col-sm-12" style={{ margin: '0.4rem', position: 'relative' }} key={book._id}>
                             
                              <img src={book.image} className="card-img-top" alt="Vedic Book Image" style={{ height: '250px', objectFit: 'cover' }} />
                              
                            {/* Wishlist */}
                              <div className="wishlist-icon" onClick={()=>handleWishlist(book)}>
                                  <i className={`bi ${wishlistIds.includes(book._id) ? 'bi-heart-fill text-danger' : 'bi-heart text-dark'}`}></i>
                              </div>

                              <div className="card-body mt-auto" >
                                  <h5 className="card-title">{book.title}</h5>
                                  <p className="card-price">₹{book.price}</p>
                                  <div className="books-btn" style={{display:'flex', gap:'5px'}}>
                                    <button className="btn book-btn" onClick={()=>handleAddCart(book)}> <i className="bi bi-cart"></i>Cart</button>
                                    <button className="btn book-btn" onClick={()=>handleSubmit(book._id)}>View More</button>
                                  </div>
                              </div>
                        </div>
                    )})}
                   </div>
                </div>
            </div>   
    </>
  )
}
