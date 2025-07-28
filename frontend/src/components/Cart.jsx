import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Payments from './Payment';
import axios from 'axios';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();

  //  Calculate total value 
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//  reduce method: array.reduce((accumulator, currentItem) => { ... }, initialValue)

  return (
    <div className="container my-5">
      <h3 className="mb-3 p-4 d-flex align-items-center" style={{width:'100%', height:'4rem', backgroundColor:'#3E2723', color:'white'}}><i className="bi bi-cart-fill"></i> &nbsp;My Cart</h3>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-center">
              <thead className="table-dark" >
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                  <th>Subtotal (₹)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                    <td>
                        <div className='' style={{display:'flex', justifyContent:'center', gap:'1rem'}}>
                           <div style={{border:'1px black solid', padding:'0.5rem'}}><i className="bi bi-plus" onClick={()=>addToCart({
                                        _id: item.productId,
                                        image: item.image,
                                        price: item.price,
                                        title: item.title,
                                      })
                            }></i></div>
                           <div style={{border:'1px black solid', padding:'0.5rem'}}  onClick={() => removeFromCart(item._id)}><i className="bi bi-dash"></i></div>
                           
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-end fw-bold">Total:</td>
                  <td className="fw-bold">₹{totalAmount}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
             <div style={{float:'right'}}><Payments amount={totalAmount} /></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
