import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "./Navbar.css";

export default function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, logout, isLoggedIn } = useAuth();
  const { clearCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    logout();
    clearCart();
    toast.success("You have been logged out.");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="custom-navbar">
      <div className="nav-container">
        {/* Brand */}
        <Link to="/" className="nav-brand">
          VedPath
        </Link>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li>
            <Link to="/cart" onClick={closeMenu}>Cart</Link>
          </li>
          <li>
            <Link to="/books" onClick={closeMenu}>Books</Link>
          </li>
          <li>
            <Link to="/audio" onClick={closeMenu}>Audio</Link>
          </li>
          <li>
            <Link to="/courses" onClick={closeMenu}>Courses</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              <li>
                <span className="username">{user.name}</span>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={closeMenu}>Login</Link>
            </li>
          )}
          <li>
            <button className="theme-btn" onClick={handleChange}>
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
