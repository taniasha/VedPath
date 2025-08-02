import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

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
    axios.post('http://localhost:5000/admin/addtrending', form,{ 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    })
      .then((res) => {
        console.log('✅ Book Added:', res.data);
        toast.success("Add trending Book Successfully")
        setForm({ title: '', image: '', price: '', author:'',rating:'' });
      })
      .catch((err) => {
        console.error('❌ Error:', err);
        toast.error("Failed to add Book")
      });
  };

  const handleSubmit = () => {
     handleTrending();
  };

  return (
    <div >
     <h4 className="mb-3 fw-bold"><i class="bi bi-fire admin-icon fs-3"></i> Add a New Trending Book</h4>

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
      <button  className=' btn book-btn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}
