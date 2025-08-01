import axios from 'axios';
import React, { useState } from 'react';

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
    axios.post('http://localhost:5000/trending/addtrending', form)
      .then((res) => {
        console.log('✅ Book Added:', res.data);
        setForm({ title: '', image: '', price: '', author:'',rating:'' });
      })
      .catch((err) => console.error('❌ Error:', err));
  };

  const handleSubmit = () => {
     handleTrending();
  };

  return (
    <div style={{width:'100vw'}} >
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
       <input
        type="text"
        name="author"
        placeholder="Book Author"
        value={form.author}
        onChange={handleChange}
      />
       <input
        type="text"
        name="rating"
        placeholder="Book Rating"
        value={form.rating}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
