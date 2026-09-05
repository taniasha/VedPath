import axios from 'axios';
import React, { useState } from 'react';
import {toast} from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminBooks() {
  const [form, setForm] = useState({
    image: '',
    price: '',
    title: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooks = () => {
    axios.post(`${API_URL}/admin/addbooks`, form ,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
      .then((res) => {
        console.log(' Book Added:', res.data);
        toast.success("Book Added Successfully")
        setForm({ title: '', image: '', price: '' });
      })
      .catch((err) => {
        console.error(' Error:', err);
        toast.error("Failed to add Book")
      });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!form.title || !form.price || !form.image) {
      toast.error("Please fill all required fields");
      return;
    }
    handleBooks();
  };

  return (
    <div>
      <h4 className="font-cinzel fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: '#d4af37' }}>
        <i className="bi bi-book-fill" /> Add a New Book
      </h4>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold" style={{ color: '#f5e6c8', fontSize: '0.9rem' }}>
              Book Title <span style={{ color: '#d4af37' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Bhagavad Gita As It Is"
              name="title"
              className="input-gold"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold" style={{ color: '#f5e6c8', fontSize: '0.9rem' }}>
              Price (₹) <span style={{ color: '#d4af37' }}>*</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="e.g. 499"
              className="input-gold"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold" style={{ color: '#f5e6c8', fontSize: '0.9rem' }}>
              Book Cover Image URL <span style={{ color: '#d4af37' }}>*</span>
            </label>
            <input
              type="text"
              name="image"
              placeholder="https://vediccosmos.com/wp-content/uploads/..."
              className="input-gold"
              value={form.image}
              onChange={handleChange}
              required
            />
          </div>

          {form.image && (
            <div className="col-12">
              <p className="mb-2" style={{ color: '#9e8a6e', fontSize: '0.85rem' }}>Cover Preview:</p>
              <img
                src={form.image}
                alt="Book Preview"
                style={{ width: '80px', height: '110px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.3)' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}

          <div className="col-12 pt-2">
            <button
              type="submit"
              className="btn-gold py-2 px-5 fw-bold font-cinzel d-inline-flex align-items-center gap-2"
              style={{ borderRadius: '10px', fontSize: '0.95rem' }}
            >
              <i className="bi bi-plus-circle-fill" /> Add Book
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
