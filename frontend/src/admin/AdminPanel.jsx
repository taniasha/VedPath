import React, { useState } from 'react';
import AdminBooks from './AdminBooks';
import AdminTrending from './AdminTrending';
import AdminAudio from './AdminAudio';
import AdminOrders from './AdminOrders';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('books');

  const renderContent = () => {
    switch (activeTab) {
      case 'books':
        return <AdminBooks/>;
      case 'trending':
        return <AdminTrending />;
      case 'audio':
        return <AdminAudio />;
      case 'orders':
        return <AdminOrders/>;
      default:
        return <p>Select an option from the left menu.</p>;
    }
  };

 return (
  <div className="container-fluid">
    <div className="row" style={{ height: '100vh', overflow: 'hidden' }}>

      {/* Sidebar Navbar */}
      <nav
        className="col-md-3 col-lg-2 bg-light sidebar shadow-sm px-3 py-4"
        style={{ height: '100%', overflowY: 'auto' }}
      >
        <h5 className="text-center mb-4 fw-bolder">Admin Menu</h5>
        <ul className="nav flex-column gap-3">
          <li className="nav-item">
            <button onClick={() => setActiveTab('books')} className={`nav-link btn btn-link w-100 text-start ${activeTab === 'books' ? 'active text-primary' : ''}`}>
              📚 Insert Books
            </button>
          </li>
          <li className="nav-item">
            <button onClick={() => setActiveTab('trending')} className={`nav-link btn btn-link w-100 text-start ${activeTab === 'trending' ? 'active text-primary' : ''}`}>
              Insert Trending
            </button>
          </li>
          <li className="nav-item">
            <button onClick={() => setActiveTab('audio')} className={`nav-link btn btn-link w-100 text-start ${activeTab === 'audio' ? 'active text-primary' : ''}`}>
              🎧 Insert Audio
            </button>
          </li>
          <li className="nav-item">
            <button onClick={() => setActiveTab('orders')} className={`nav-link btn btn-link w-100 text-start ${activeTab === 'orders' ? 'active text-primary' : ''}`}>
              📦 Order Tracking
            </button>
          </li>
          <li className="nav-item">
            <button onClick={() => setActiveTab('users')} className={`nav-link btn btn-link w-100 text-start ${activeTab === 'users' ? 'active text-primary' : ''}`}>
              👥 Signup Users
            </button>
          </li>
        </ul>
      </nav>

      {/* Dynamic Component Area (Scrollable) */}
      <main
        className="col-md-9 ms-sm-auto col-lg-10 py-4 "
        style={{ height: '100%', overflowY: 'auto' }}
      >
        <div className="px-3">
          {renderContent()}
        </div>
      </main>

    </div>
  </div>
);

}
