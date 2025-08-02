import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function AdminAudio() {
  const [form, setForm] = useState({
    title: '',
    scripture: '',
    audioUrl: '',
  });

  // Fix 1: Correct way to update form values
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fix 2: Include form data in POST request
  const handleAudio = async () => {
    console.log("hey")
    try {
      const response = await axios.post('http://localhost:5000/admin/create-audio', form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
          console.log("Audio added:", response.data);
          toast.success("Audio added successfully!");
    } catch (e) {
          console.error("Error adding audio:", e.message);
          toast.error("Failed to add Audio")
   }
  };

  // Fix 3: Add `e` in handleSubmit to prevent form reload
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAudio();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='admin-audio'>
           <h4 className="mb-3 fw-bold"><i class="bi bi-headphones admin-icon fs-1"></i> Add a New Audio</h4>

          <input
            type="text"
            name="title"
            placeholder='Enter title'
            value={form.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="scripture"
            placeholder='Enter Scripture'
            value={form.scripture}
            onChange={handleChange}
          />
          <input
            type="text"
            name="audioUrl"
            placeholder='Enter audio url'
            value={form.audioUrl}
            onChange={handleChange}
          />
          <button className='btn book-btn' type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
