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
        console.log("Fetched Orders:", res.data.orders);
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
      <h2 className="mb-4 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">You have no paid orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.orderId}
            className="card mb-4 shadow-sm p-3"
            style={{ borderRadius: "16px" }}
          >
            <h5 className="fw-bold">Order ID: {order.orderId}</h5>
            <p className="text-muted">
              Date: {new Date(order.date).toLocaleString()}
            </p>
            <p className="fw-semibold">Total Amount: ₹{order.totalAmount}</p>

            <h6 className="mt-3">Items:</h6>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.title} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;