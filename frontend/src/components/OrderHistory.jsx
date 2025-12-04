import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/order/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center p-5">Loading your orders...</div>;
  if (error) return <div className="text-center text-danger p-5">{error}</div>;

  return (
    <div className="container py-4">

      <h2 className="text-center fw-bold mb-4"
        style={{ letterSpacing: "1px", color: "#333" }}>
        My Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center p-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076502.png"
            width="120"
            className="mb-3 opacity-75"
          />
          <p className="fw-semibold text-muted">You have no paid orders yet.</p>
        </div>
      ) : (
        <div className="row g-4 p-4">
          {orders.map((order) => (
            <div className="col-md-6 d-flex justify-content-center" key={order.orderId}>
              <div
                className="card shadow-sm border-0"
                style={{
                  borderRadius: "18px",
                  transition: "0.3s",
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold mb-0">#{order.orderId}</h5>
                    <span className="badge bg-success">Paid</span>
                  </div>

                  <p className="text-muted small mb-2">
                    {new Date(order.date).toLocaleString()}
                  </p>

                  <p className="fw-semibold fs-5 mb-3">
                    Total: <span className="text-success">₹{order.totalAmount}</span>
                  </p>

                  <h6 className="fw-bold mb-2">Items:</h6>
                  <ul className="list-group small">
                    {order.items.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between"
                      >
                        <span>{item.title}</span>
                        <span className="fw-semibold">× {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
