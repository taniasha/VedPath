import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${API_URL}/order/my-orders`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data.orders || []))
      .catch(() => setError('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="section-dark d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      <p style={{ color: '#9e8a6e' }}>Loading your orders...</p>
    </div>
  );
  if (error) return (
    <div className="section-dark d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      <p style={{ color: '#e57373' }}>{error}</p>
    </div>
  );

  return (
    <div className="section-dark py-5 px-3" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h2 className="section-heading mb-2">My Orders</h2>
        <div className="gold-divider mb-5" />

        {orders.length === 0 ? (
          <div className="text-center py-5">
            <img src="https://cdn-icons-png.flaticon.com/512/4076/4076502.png" width="100" className="mb-3 opacity-50" alt="no orders" />
            <p style={{ color: '#9e8a6e' }}>You have no paid orders yet.</p>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {orders.map(order => (
              <div key={order.orderId} className="col-md-6">
                <div className="glass-card p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="font-cinzel fw-bold mb-0" style={{ color: '#f5e6c8', fontSize: '0.95rem' }}>
                      #{order.orderId}
                    </h5>
                    <span className="badge px-3 py-2" style={{ background: 'rgba(212,175,55,0.2)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '20px' }}>
                      Paid
                    </span>
                  </div>
                  <p className="mb-2" style={{ color: '#9e8a6e', fontSize: '0.82rem' }}>
                    {new Date(order.date).toLocaleString()}
                  </p>
                  <p className="fw-bold mb-3" style={{ color: '#d4af37', fontSize: '1.1rem' }}>
                    Total: ₹{order.totalAmount}
                  </p>
                  <h6 className="font-cinzel mb-2" style={{ color: '#f5e6c8', fontSize: '0.85rem' }}>Items:</h6>
                  <ul className="list-unstyled mb-0">
                    {order.items.map((item, i) => (
                      <li key={i} className="d-flex justify-content-between py-1"
                        style={{ borderBottom: '1px solid rgba(212,175,55,0.1)', color: '#9e8a6e', fontSize: '0.85rem' }}>
                        <span>{item.title}</span>
                        <span style={{ color: '#d4af37' }}>× {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
