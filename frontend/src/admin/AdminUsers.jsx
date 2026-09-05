import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleUsers();
  }, []);

  const handleUsers = () => {
    axios
      .get(`${API_URL}/admin/user-data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((response) => setUsers(response.data.users))
      .catch((e) => console.log(e.message));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="font-cinzel fw-bold mb-0 d-flex align-items-center gap-2" style={{ color: '#d4af37' }}>
          <i className="bi bi-people-fill" /> Registered Users
        </h4>
        <span className="badge px-3 py-2" style={{ background: 'rgba(212,175,55,0.15)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '20px' }}>
          {users.length} Users
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
              <th>Full Name</th>
              <th>Email Address</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-5" style={{ color: '#9e8a6e' }}>
                  <i className="bi bi-people fs-2 d-block mb-2 opacity-50" />
                  No users registered yet.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id || index}>
                  <td style={{ color: '#9e8a6e' }}>{index + 1}</td>
                  <td className="fw-semibold font-cinzel" style={{ color: '#f5e6c8' }}>
                    <i className="bi bi-person-circle me-2 text-warning" />
                    {user.name}
                  </td>
                  <td style={{ color: '#f5e6c8' }}>
                    <i className="bi bi-envelope me-1" style={{ color: '#9e8a6e' }} />
                    {user.email}
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#9e8a6e' }}>
                    {user._id}
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
