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
    <div className="container">
      {/* <h3 className="mb-3">Orders Tracking</h3> */}
           <h4 className="mb-3 fw-bold"><i class="bi bi-box-fill admin-icon fs-2"></i> All Orders</h4>

      <div className="table-responsive" >
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark" style={{textAlign:'center'}}>
            <tr>
              <th>S No.</th>
              <th>User ID</th>
              <th>Order ID</th>
              <th>Total Amount</th> 
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {datas.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No orders found</td>
              </tr>
            ) : (
              datas.map((data,index) => (
                <tr key={data._id}>
                  <td>{index+1}</td>
                  <td>{data.userId}</td>
                  <td>{data.orderId}</td>
                  <td>₹{data.totalAmount}</td>
                  <td>
                    <ul className="mb-0 ps-3">
                        {data.items?.map((item, index) => (
                        <li key={index} className="mb-1">
                            <strong>{item.title}</strong> <span className="text-muted">x {item.quantity}</span>
                        </li>
                        ))}
                    </ul>
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
