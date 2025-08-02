import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleUsers();
  }, []);

  const handleUsers = () => {
    axios
      .get('http://localhost:5000/admin/user-data', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((response) => setUsers(response.data.users))
      .catch((e) => console.log(e.message));
  };

  return (
    <div className="container">
         <h4 className="mb-3 fw-bold"><i class="bi bi-people-fill admin-icon fs-1"></i> Registered Users</h4>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-dark sticky-top">
              <tr>
                <th scope="col">S. No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">User ID</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-muted">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td className="fw-medium">{user.name}</td>
                    <td>{user.email}</td>
                    <td className="text-break">{user._id}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
}
