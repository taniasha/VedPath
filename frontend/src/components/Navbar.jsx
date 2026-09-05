import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const { user, logout, isLoggedIn } = useAuth();
  const { clearCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    clearCart();
    toast.success("You have been logged out.");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="vedpath-navbar">
      <div className="container-fluid h-100 d-flex align-items-center justify-content-between px-4">

        {/* Brand */}
        <Link to="/" className="shimmer-text font-cinzel fw-bold fs-4">
          VedPath
        </Link>

        {/* Desktop Links */}
        <ul className="d-none d-md-flex align-items-center gap-4 list-unstyled mb-0">
          <li><Link to="/" className="nav-link-gold" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/books" className="nav-link-gold" onClick={closeMenu}>Books</Link></li>
          <li><Link to="/audio" className="nav-link-gold" onClick={closeMenu}>Audio</Link></li>
          <li><Link to="/courses" className="nav-link-gold" onClick={closeMenu}>Courses</Link></li>
          <li><Link to="/cart" className="nav-link-gold" onClick={closeMenu}>Cart</Link></li>

          {isLoggedIn ? (
            <>
              {/* Dropdown */}
              <li
                className="position-relative py-2"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <span
                  className="nav-link-gold d-inline-flex align-items-center gap-1"
                  style={{ cursor: 'pointer' }}
                >
                  My Account <i className={`bi bi-chevron-${dropdown ? 'up' : 'down'}`} style={{ fontSize: '0.72rem', transition: 'transform 0.2s ease' }} />
                </span>
                {dropdown && (
                  <div className="dropdown-menu-gold">
                    <Link
                      to="/order-history"
                      onClick={() => { closeMenu(); setDropdown(false); }}
                      className="dropdown-item-gold"
                    >
                      <i className="bi bi-box-seam" />
                      <span>My Orders</span>
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => { closeMenu(); setDropdown(false); }}
                      className="dropdown-item-gold"
                    >
                      <i className="bi bi-heart" />
                      <span>Wishlist</span>
                    </Link>
                  </div>
                )}
              </li>

              {user?.email === 'vedpath@gmail.com' && (
                <li>
                  <Link to="/adminpanel" className="badge px-3 py-2 text-dark fw-bold font-cinzel"
                    style={{ background: 'linear-gradient(135deg, #d4af37, #f0c84a)', borderRadius: '20px', textDecoration: 'none', letterSpacing: '0.5px' }}>
                    <i className="bi bi-shield-lock-fill me-1" /> ADMIN
                  </Link>
                </li>
              )}

              <li>
                <span className="font-cinzel fw-semibold" style={{ color: '#d4af37', fontSize: '0.875rem' }}>
                  {user.name}
                </span>
              </li>
              <li>
                <button className="btn-gold-outline py-1 px-3" style={{ fontSize: '0.8rem', borderRadius: '8px' }} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="btn-gold py-2 px-4" style={{ borderRadius: '8px', fontSize: '0.85rem' }} onClick={closeMenu}>
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="d-md-none d-flex flex-column gap-1 bg-transparent border-0 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ cursor: 'pointer' }}
        >
          <span className="hamburger-bar"
            style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span className="hamburger-bar"
            style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="hamburger-bar"
            style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="d-md-none d-flex flex-column gap-3 px-4 pb-4 pt-2"
          style={{ background: 'rgba(13,10,7,0.98)', borderTop: '1px solid rgba(212,175,55,0.1)' }}
        >
          {["/", "/books", "/audio", "/courses", "/cart"].map((path, i) => (
            <Link key={path} to={path} onClick={closeMenu} className="nav-link-gold">
              {["Home", "Books", "Audio", "Courses", "Cart"][i]}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link to="/order-history" onClick={closeMenu} className="nav-link-gold">My Orders</Link>
              <Link to="/wishlist" onClick={closeMenu} className="nav-link-gold">Wishlist</Link>
              <span className="fw-semibold font-cinzel" style={{ color: '#d4af37', fontSize: '0.875rem' }}>{user.name}</span>
              <button onClick={handleLogout} className="btn-gold-outline w-auto py-1 px-3" style={{ borderRadius: '8px', fontSize: '0.85rem' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={closeMenu} className="btn-gold py-2 px-4 w-auto" style={{ borderRadius: '8px', fontSize: '0.85rem', display: 'inline-block' }}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
