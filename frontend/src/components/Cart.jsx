import React from 'react';
import { useCart } from '../context/CartContext';
import Payments from './Payment';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="section-dark py-5 px-3" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h3 className="font-cinzel fw-bold mb-4 d-flex align-items-center gap-2 px-4 py-3"
          style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px', color: '#d4af37' }}>
          <i className="bi bi-cart-fill" /> My Cart
        </h3>

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-cart-x" style={{ fontSize: '3rem', color: '#9e8a6e' }} />
            <p className="mt-3" style={{ color: '#9e8a6e' }}>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="table-responsive" style={{
              background: '#120d08',
              border: '1px solid rgba(212,175,55,0.22)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(0,0,0,0.6)'
            }}>
              <table className="table table-dark-custom text-center align-middle mb-0">
                <thead>
                  <tr>
                    <th>Image</th><th>Title</th><th>Price (₹)</th>
                    <th>Qty</th><th>Subtotal (₹)</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item._id}>
                      <td><img src={item.image} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.25)' }} /></td>
                      <td className="font-cinzel fw-semibold" style={{ fontSize: '0.9rem', color: '#f5e6c8' }}>{item.title}</td>
                      <td style={{ color: '#d4af37', fontWeight: '600' }}>₹{item.price}</td>
                      <td style={{ fontWeight: '600', color: '#f5e6c8' }}>{item.quantity}</td>
                      <td style={{ color: '#d4af37', fontWeight: '700' }}>₹{item.price * item.quantity}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button className="btn-gold py-1 px-2" style={{ borderRadius: '6px', fontSize: '1rem', lineHeight: 1 }}
                            onClick={() => addToCart({ _id: item.productId, image: item.image, price: item.price, title: item.title })}>
                            <i className="bi bi-plus" />
                          </button>
                          <button className="btn-gold-outline py-1 px-2" style={{ borderRadius: '6px', fontSize: '1rem', lineHeight: 1, color: '#d4af37', borderColor: 'rgba(212,175,55,0.4)' }}
                            onClick={() => removeFromCart(item._id)}>
                            <i className="bi bi-dash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="text-end fw-bold font-cinzel" style={{ color: '#d4af37', fontSize: '1.05rem', letterSpacing: '1px' }}>
                      TOTAL:
                    </td>
                    <td className="fw-bold" style={{ color: '#f0c84a', fontSize: '1.25rem' }}>₹{totalAmount}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <Payments amount={totalAmount} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
