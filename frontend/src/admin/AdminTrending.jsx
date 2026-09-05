import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminTrending() {
  const [form, setForm] = useState({
    image: '',
    price: '',
    title: '',
    author:'',
    rating:''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTrending = () => {
    axios.post(`${API_URL}/admin/addtrending`, form,{ 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    })
      .then((res) => {
        console.log('Book Added:', res.data);
        toast.success("Add trending Book Successfully")
        setForm({ title: '', image: '', price: '', author:'',rating:'' });
      })
      .catch((err) => {
        console.error('Error:', err);
        toast.error("Failed to add Book")
      });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!form.title || !form.price || !form.image || !form.author) {
      toast.error("Please fill all required fields");
      return;
    }
    handleTrending();
  };

  return (
    <div>
      <h4 className="font-cinzel fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: '#d4af37' }}>
        <i className="bi bi-fire" /> Add a New Trending Book
      </h4>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold" style={{ color: '#f5e6c8', fontSize: '0.9rem' }}>
              Book Title <span style={{ color: '#d4af37' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Yoga Sutras of Patanjali"
              name="title"
              className="input-gold"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold" style={{ color: '#f5e6c8', fontSize: '0.9rem' }}>
              Author Name <span style={{ color: '#d4af37' }}>*</span>
            </label>
            <input
              type="text"
              name="author"
              placeholder="e.g. Maharishi Patanjali"
              className="input-gold"
              value={form.author}
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
              placeholder="e.g. 349"
              className="input-gold"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold" style={{ color: '#f5e6c8', fontSize: '0.9rem' }}>
              Rating (1 to 5)
            </label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              placeholder="e.g. 5"
              className="input-gold"
              value={form.rating}
              onChange={handleChange}
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
                alt="Trending Preview"
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
              <i className="bi bi-fire" /> Add Trending Book
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
