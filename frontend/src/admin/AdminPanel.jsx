import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminBooks from './AdminBooks';
import AdminTrending from './AdminTrending';
import AdminAudio from './AdminAudio';
import AdminOrders from './AdminOrders';
import AdminUsers from './AdminUsers';
import { useAuth } from '../context/AuthContext';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('books');
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logout successful");
    navigate('/login');
  };

  const navItems = [
    { id: 'books', label: 'Insert Books', icon: 'bi-book-fill' },
    { id: 'trending', label: 'Insert Trending', icon: 'bi-fire' },
    { id: 'audio', label: 'Insert Audio', icon: 'bi-headphones' },
    { id: 'orders', label: 'Order Tracking', icon: 'bi-box-seam-fill' },
    { id: 'users', label: 'Signup Users', icon: 'bi-people-fill' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'books': return <AdminBooks />;
      case 'trending': return <AdminTrending />;
      case 'audio': return <AdminAudio />;
      case 'orders': return <AdminOrders />;
      case 'users': return <AdminUsers />;
      default: return <p style={{ color: '#9e8a6e' }}>Select an option from the menu.</p>;
    }
  };

  return (
    <div className="section-dark" style={{ marginTop: '-64px', minHeight: '100vh' }}>
      <div className="container-fluid px-0">
        <div className="row g-0">

          {/* Sidebar */}
          <nav className="col-12 col-md-4 col-lg-3 col-xl-2 admin-sidebar d-flex flex-column justify-content-between"
            style={{ minHeight: '100vh', paddingTop: '1.5rem' }}>
            <div>
              <div className="px-2 mb-4 pb-3" style={{ borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
                <h4 className="font-cinzel fw-bold mb-1 d-flex align-items-center gap-2" style={{ color: '#d4af37', fontSize: '1.25rem' }}>
                  <i className="bi bi-shield-lock-fill" /> Admin Menu
                </h4>
                <small style={{ color: '#9e8a6e', fontSize: '0.72rem', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  VedPath Management
                </small>
              </div>

              <div className="d-flex flex-column">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`admin-tab-btn ${activeTab === item.id ? 'active' : ''}`}
                  >
                    <i className={`bi ${item.icon}`} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="pt-3 mt-4" style={{ borderTop: '1px solid rgba(212,175,55,0.15)' }}>
              <button onClick={handleLogout} className="admin-tab-btn" style={{ color: '#e57373' }}>
                <i className="bi bi-box-arrow-right" style={{ color: '#e57373' }} />
                <span>Logout</span>
              </button>
            </div>
          </nav>

          {/* Main Dashboard Area */}
          <main className="col-12 col-md-8 col-lg-9 col-xl-10 p-3 p-sm-4 p-lg-4" style={{ minHeight: '100vh', overflowY: 'auto' }}>
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 gap-3"
              style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
              <div>
                <h2 className="font-cinzel fw-bold mb-0" style={{ color: '#f5e6c8', fontSize: '1.75rem' }}>
                  {navItems.find(i => i.id === activeTab)?.label}
                </h2>
              </div>

              <div className="d-flex gap-2 align-items-center">
                <button className="btn-gold-outline py-2 px-3 d-inline-flex align-items-center gap-2"
                  style={{ borderRadius: '8px', fontSize: '0.85rem', color: '#e57373', borderColor: 'rgba(229,115,115,0.4)' }}
                  onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right" /> Logout
                </button>
              </div>
            </div>

            {/* Content Card Container */}
            <div className="glass-card p-4 p-lg-5" style={{ borderRadius: '18px', border: '1px solid rgba(212,175,55,0.22)', background: '#120d08', boxShadow: '0 12px 36px rgba(0,0,0,0.5)' }}>
              {renderContent()}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
