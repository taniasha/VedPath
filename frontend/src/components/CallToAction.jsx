import React from 'react';
import { Link } from 'react-router-dom';

export default function AudioPromo() {
  return (
    <div className="audio-banner my-4">
      <img
        src="/assets/Gemini_Generated_Image_gxcs21gxcs21gxcs.png"
        alt="Cosmic Vibes"
        className="audio-bg-img"
      />
      <div className="audio-content text-center px-3">
        <h2 className="heading-glow mb-3" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}>
          Listen Free Audio of Vedic Chants
        </h2>
        <p className="mb-4 fw-light" style={{ color: '#f5e6c8', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', animation: 'fadeInUp 2s infinite alternate' }}>
          Immerse yourself in divine frequencies and inner peace.
        </p>
        <Link to="/audio">
          <button className="btn-gold px-5 py-3" style={{ borderRadius: '50px', fontSize: '1rem', letterSpacing: '0.05em' }}>
            🎵 Listen Now
          </button>
        </Link>
      </div>
    </div>
  );
}
