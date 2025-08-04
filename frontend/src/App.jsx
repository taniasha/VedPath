import { useState, useEffect } from 'react'
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import {ThemeProvider}  from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Books from './components/Books';
import DisplayBooks from './components/DisplayBooks';
import Home from './components/Home';
import Footer from './components/Footer';
// import Navbar from './components/Navbar';
import DisplayTrendingBooks from './components/DisplayTrendingBooks';
import Cart  from './components/Cart';
import PrivateRoute from './components/PrivateRoute';
import Wishlist from './components/Wishlist';
import Courses from './components/Courses';
import CallToAction from './components/CallToAction';
import AdminPanel from './admin/AdminPanel';
import AudioLibrary from './components/AudioLibrary';

function App() {

const user = JSON.parse(localStorage.getItem("user"));
   
   useEffect(() => {
    AOS.init({
      duration: 2000,
      once: false,
      mirror:true,
    });
  }, []);

   const onScroll = () => {
    AOS.refresh(); // re-check element positions
  };



  //  const [theme,setTheme] = useState('dark'); //globally manage krna hai taki sabhi componenet k pas ye jaye
  //  const [auth, setAuth] = useState(true);

  return (
   <>                      
    {/* we r wrapping our all routes will themecontext.provider and data(value) so that it will be accessible globally */}
            <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
           {!user || user?.email !== 'vedpath@gmail.com' ? <Navbar /> : null}

              <div className="content-wrapper">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/book/:id" element={<DisplayBooks />} />
                  <Route path="/trending/:id" element={<DisplayTrendingBooks />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/courses" element={<Courses/>}/>
                  <Route path="/cta" element={<CallToAction/>}/>
                  <Route path="/audio" element={<AudioLibrary/>}/>
                  <Route path='/adminpanel' element={<AdminPanel/>}/>
                </Routes>
              </div>
              <Footer />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
            </BrowserRouter>
   </>
  )
}

export default App;
