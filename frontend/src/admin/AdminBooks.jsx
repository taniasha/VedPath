import axios from 'axios';
import React, { useState } from 'react';
import {toast} from 'react-toastify';

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
    axios.post('http://localhost:5000/admin/addbooks', form ,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
      .then((res) => {
        console.log('✅ Book Added:', res.data);
        toast.success("Book Added Successfully")
        setForm({ title: '', image: '', price: '' });
      })
      .catch((err) => {
        console.error('❌ Error:', err);
        toast.error("Failed to add Book")
      });
  };

  const handleSubmit = () => {
    handleBooks();
  };

  return (
    <div >
      <h4 className="mb-3 fw-bold"><i class="bi bi-book-fill admin-icon fs-3"></i> Add a New Book</h4>

      <input
        type="text"
        placeholder="Book Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Book image Link"
        value={form.image}
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Enter Price"
        value={form.price}
        onChange={handleChange}
      />
      <button className='btn book-btn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}
