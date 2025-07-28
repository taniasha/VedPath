import { useState, useEffect } from 'react'
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Books from './components/Books';
import {ThemeProvider}  from './context/ThemeContext';
import AdminBooks from './admin/AdminBooks';
import DisplayBooks from './components/DisplayBooks';
import Test from './components/Test'
import AdminTrending from './admin/AdminTrending';
import Home from './components/Home';
import Footer from './components/footer';
import DisplayTrendingBooks from './components/DisplayTrendingBooks';
import { CartProvider } from './context/CartContext';
import Cart  from './components/Cart';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Wishlist from './components/Wishlist';
import Courses from './components/Courses';

function App() {

   useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  //  const [theme,setTheme] = useState('dark'); //globally manage krna hai taki sabhi componenet k pas ye jaye
  //  const [auth, setAuth] = useState(true);

  return (
   <>                      
    {/* we r wrapping our all routes will themecontext.provider and data(value) so that it will be accessible globally */}
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
            <BrowserRouter>
              <Navbar />
              <main className="content-wrapper">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/admin" element={<AdminBooks />} />
                  <Route path="/admintrending" element={<AdminTrending />} />
                  <Route path="/book/:id" element={<DisplayBooks />} />
                  <Route path="/trending/:id" element={<DisplayTrendingBooks />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/courses" element={<Courses/>}/>
                </Routes>
              </main>
              <Footer />
            </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
   </>
  )
}

export default App;
