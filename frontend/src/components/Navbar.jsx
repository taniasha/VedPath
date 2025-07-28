import React, { useContext } from 'react'
import {Link ,  useNavigate } from 'react-router-dom';
import '../index.css';
import ThemeContext from '../context/ThemeContext';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {

  const { theme, setTheme} =  useContext(ThemeContext);
  const navigate = useNavigate();
  const { user, logout, isLoggedIn} = useAuth();
  const {clearCart} = useCart();
  
  console.log("🔐 user:", user);
  console.log("✅ isLoggedIn:", isLoggedIn);

  const handleChange=()=>{
    if(theme === "dark"){ setTheme("light")}
    else{setTheme("dark")}
  }

  const handleLogout=()=>{
     logout();
     clearCart();
     navigate("/")
  }

  return (
    <>
       <div id="nav" style={{overflow:'visible'}}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 fw-bolder" to="/">VedPath</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-3 fs-5 ms-5">
                        <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item mx-3  fs-5">
                        <Link className="nav-link" to={"/cart"}>Cart</Link>
                        </li>
                        <li className="nav-item mx-3 fs-5">
                        <Link className="nav-link" to={"/books"}>Books</Link>
                        </li>
                        <li className="nav-item mx-3 fs-5">
                        <Link className="nav-link" to={"/courses"}>Courses</Link>
                        </li>
                        {isLoggedIn? 
                          <li className="nav-item mx-3 fs-5">
                            <Link className="nav-link" onClick={handleLogout}>Logout</Link>
                          </li>  
                          :    
                          <li className="nav-item mx-3 fs-5">
                            <Link className="nav-link" to={"/login"}>Login</Link>
                          </li>
                        }
                        <li className="nav-link mx-3 fs-5 dropdown"><a className="dropdown-toggle" style={{textDecoration:'none', color:'#252525'}} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          {isLoggedIn ? user.name :" My Account" }</a>

                          {isLoggedIn ? (
                          <ul className="dropdown-menu p-2">
                            <li>
                              <Link className="dropdown-item nav-link" to={"/my-orders"}>My Orders</Link>
                            </li>
                            <li>
                              <Link className="dropdown-item nav-link" to={"/cart"}>My Cart</Link>
                            </li>
                            <li>
                              <Link className="dropdown-item nav-link" to={"/wishlist"}>My Wishlist</Link>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <button className="dropdown-item text-danger nav-link" onClick={handleLogout}>
                                Logout
                              </button>
                            </li>
                             
                            
                          </ul>
                          ) : (
                             <ul className="dropdown-menu p-2">
                                <li>
                                  <Link className="dropdown-item text-danger nav-link" to="/login">
                                    Login
                                  </Link>
                                </li>
                              </ul>
                          )}

                        </li>

                    </ul>
                    <div className="nav-item mx-3 fs-5">
                        <button className=" btn btn-outline-dark p-2 mb-2"  onClick={handleChange}>{theme==="dark"? <i className="bi bi-moon"></i> : <i className="bi bi-moon-fill"></i>}</button>
                      </div>

                    
                    </div>
                </div>
           </nav>
       </div>
      
    </>
  )
}
