import React, { useState } from 'react';
import AdminBooks from './AdminBooks';
import AdminTrending from './AdminTrending';
import AdminAudio from './AdminAudio';
import AdminOrders from './AdminOrders';
import AdminUsers from './AdminUsers';
import { useAuth } from '../context/AuthContext';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('books');
  const {logout} = useAuth();

  const handleLogout=()=>{
     logout();
     toast.success("Logout successfull");
  }

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
     case 'users':
        return <AdminUsers/>;
      default:
        return <p>Select an option from the left menu.</p>;
    }
  };

 return (
  <div className="container-fluid"> 
    <div className="row" style={{ height: '100vh', overflow: 'hidden' }}>

      {/* Sidebar Navbar */}
      <nav
        className="col-md-3 col-lg-2 bg-light sidebar shadow-sm py-4"
        style={{ height: '100%', overflowY: 'auto' }}
        >
        <h3 className="text-center mb-4 fw-bolder" style={{color:'#863434ff'}}>Admin Menu</h3>
        <hr />

        <ul className="nav flex-column ">
          <li className="nav-item">
            <button onClick={() => setActiveTab('books')} className={`nav-link btn btn-link w-100 text-start ${activeTab === 'books' ? 'active text-primary' : ''}`}>
            <i class="bi bi-book-fill admin-icon fs-3"></i> Insert Books
            </button>
          </li>
          <hr />
          <li className="nav-item">
            <button onClick={() => setActiveTab('trending')} className={`nav-link btn btn-link w-100 text-start ${activeTab === 'trending' ? 'active text-primary' : ''}`}>
             <i class="bi bi-fire admin-icon fs-3"></i> Insert Trending
            </button>
          </li>
           <hr />
          <li className="nav-item">
            <button onClick={() => setActiveTab('audio')} className={`nav-link btn btn-link w-100 text-start ${activeTab === 'audio' ? 'active text-primary' : ''}`}>
              <i className="bi bi-headphones fs-3 admin-icon"></i> Insert Audio
            </button>
          </li> 
           <hr />
          <li className="nav-item">
            <button onClick={() => setActiveTab('orders')} className={`nav-link btn btn-link w-100 text-start ${activeTab === 'orders' ? 'active text-primary' : ''}`}>
              <i class="bi bi-box-fill admin-icon fs-3"></i> Order Tracking
            </button>
          </li>
          <hr />
          <li className="nav-item">
            <button onClick={() => setActiveTab('users')} className={`nav-link btn btn-link w-100 text-start ${activeTab === 'users' ? 'active text-primary' : ''}`}>
              <i class="bi bi-people-fill admin-icon fs-3"></i> Signup Users
            </button>
          </li>
        </ul>
      </nav>

      {/* Dynamic Component Area (Scrollable) */}
      <main className="col-md-9 ms-sm-auto col-lg-10 py-4"
        style={{ height: '100%', overflowY: 'auto' }}>
           <div className="d-flex justify-content-end px-3">
                <button className="btn btn-outline-danger mb-3" onClick={handleLogout}>Logout</button>
           </div>

          <div className="px-3">
            {renderContent()}
          </div>
      </main>

    </div>
  </div>
);

}
