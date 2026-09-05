import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;


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
      const response = await axios.post(`${API_URL}/admin/create-audio`, form, {
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
    e?.preventDefault();
    if (!form.title || !form.scripture || !form.audioUrl) {
      toast.error("Please fill all required fields");
      return;
    }
    handleAudio();
  };

  return (
    <div>
      <h4 className="font-cinzel fw-bold mb-4 d-flex align-items-center gap-2" style={{ color: '#d4af37' }}>
        <i className="bi bi-headphones" /> Add a New Audio Track
      </h4>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold" style={{ color: '#f5e6c8', fontSize: '0.9rem' }}>
              Audio / Mantra Title <span style={{ color: '#d4af37' }}>*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Gayatri Mantra"
              className="input-gold"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold" style={{ color: '#f5e6c8', fontSize: '0.9rem' }}>
              Associated Scripture <span style={{ color: '#d4af37' }}>*</span>
            </label>
            <input
              type="text"
              name="scripture"
              placeholder="e.g. Rig Veda"
              className="input-gold"
              value={form.scripture}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold" style={{ color: '#f5e6c8', fontSize: '0.9rem' }}>
              Audio Stream / MP3 URL <span style={{ color: '#d4af37' }}>*</span>
            </label>
            <input
              type="text"
              name="audioUrl"
              placeholder="https://www.soundhelix.com/examples/mp3/... or .mp3 URL"
              className="input-gold"
              value={form.audioUrl}
              onChange={handleChange}
              required
            />
          </div>

          {form.audioUrl && (
            <div className="col-12">
              <p className="mb-2" style={{ color: '#9e8a6e', fontSize: '0.85rem' }}>Audio Test Player:</p>
              <audio controls src={form.audioUrl} style={{ width: '100%', maxWidth: '400px' }}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          <div className="col-12 pt-2">
            <button
              type="submit"
              className="btn-gold py-2 px-5 fw-bold font-cinzel d-inline-flex align-items-center gap-2"
              style={{ borderRadius: '10px', fontSize: '0.95rem' }}
            >
              <i className="bi bi-music-note-beamed" /> Add Audio Track
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
