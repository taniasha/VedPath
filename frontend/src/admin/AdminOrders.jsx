import axios from 'axios';
import React, { useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminOrders() {
  const [datas, setData] = useState([]);

  useEffect(() => {
    handleAllOrder();
  }, []);

  const handleAllOrder = () => {
    console.log("helo")
    axios
      .get(`${API_URL}/admin/order-data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((response) => {
        console.log("DATa:",response.data)
        setData(response.data.orderData);

      })
      .catch((e) => console.log('Error', e.message));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="font-cinzel fw-bold mb-0 d-flex align-items-center gap-2" style={{ color: '#d4af37' }}>
          <i className="bi bi-box-seam-fill" /> All Customer Orders
        </h4>
        <span className="badge px-3 py-2" style={{ background: 'rgba(212,175,55,0.15)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '20px' }}>
          {datas.length} Orders
        </span>
      </div>

      <div className="table-responsive" style={{
        background: '#120d08',
        border: '1px solid rgba(212,175,55,0.2)',
        borderRadius: '16px',
        overflow: 'hidden'
      }}>
        <table className="table table-dark-custom text-center align-middle mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer / User ID</th>
              <th>Total (₹)</th>
              <th>Items</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {datas.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5" style={{ color: '#9e8a6e' }}>
                  <i className="bi bi-inbox fs-2 d-block mb-2 opacity-50" />
                  No orders found in database.
                </td>
              </tr>
            ) : (
              datas.map((data, index) => (
                <tr key={data._id || index}>
                  <td style={{ color: '#9e8a6e' }}>{index + 1}</td>
                  <td className="font-cinzel fw-bold" style={{ color: '#f5e6c8', fontSize: '0.85rem' }}>
                    {data.orderId || `#${data._id?.slice(-6)}`}
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#9e8a6e', fontFamily: 'monospace' }}>
                    {data.name ? `${data.name} (` : ''}{data.userId?.slice?.(0, 10)}...{data.name ? ')' : ''}
                  </td>
                  <td className="fw-bold" style={{ color: '#d4af37', fontSize: '1.05rem' }}>
                    ₹{data.totalAmount}
                  </td>
                  <td className="text-start" style={{ minWidth: '180px' }}>
                    <ul className="mb-0 ps-3 list-unstyled">
                      {data.items?.map((item, idx) => (
                        <li key={idx} className="mb-1" style={{ fontSize: '0.82rem', color: '#f5e6c8' }}>
                          • <strong>{item.title}</strong> <span style={{ color: '#d4af37' }}>× {item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <span className="badge px-3 py-2"
                      style={{
                        background: 'rgba(76, 175, 80, 0.15)',
                        color: '#81c784',
                        border: '1px solid rgba(76, 175, 80, 0.3)',
                        borderRadius: '20px',
                        fontSize: '0.78rem'
                      }}>
                      {data.paymentStatus || 'Paid'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
