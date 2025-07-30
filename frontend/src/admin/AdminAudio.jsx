import axios from 'axios';
import React, { useState } from 'react';

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
    try {
      const response = await axios.post('http://localhost:5000/audio/create-audio', form);
      console.log("Audio added:", response.data);
      alert("Audio added successfully!");
    } catch (e) {
      console.error("Error adding audio:", e.message);
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
