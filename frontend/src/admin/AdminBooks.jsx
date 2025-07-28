import axios from 'axios';
import React, { useState } from 'react';

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
    axios.post('http://localhost:5000/book/addbooks', form)
      .then((res) => {
        console.log('✅ Book Added:', res.data);
        setForm({ title: '', image: '', price: '' });
      })
      .catch((err) => console.error('❌ Error:', err));
  };

  const handleSubmit = () => {
    handleBooks();
  };

  return (
    <div style={{ margin: "6rem", width: "50%" }}>
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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
