import React from 'react';
import TopSellers from './TopSellers';
import Trending from './Trending';
import Authors from './Authors';
import CallToAction from './CallToAction';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Hero Banner — full blended */}
      <div
        style={{
          minHeight: '560px',
          position: 'relative',
          overflow: 'hidden',       
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background image — zoom animation isolated here */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/assets/Vedpathbanner.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'zoom 15s infinite alternate ease-in-out',
          zIndex: 0,
        }} />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(10,7,3,0.95) 0%, rgba(10,7,3,0.75) 35%, rgba(10,7,3,0.3) 65%, rgba(10,7,3,0.05) 100%)',
          zIndex: 1,
        }} />

        {/* Text — never affected by zoom */}
        <div
          className="d-flex flex-column px-5 py-5"
          style={{ position: 'relative', zIndex: 2, maxWidth: '520px', animation: 'fadeInDown 1s ease-out' }}
        >
          <p style={{ color: '#9e8a6e', fontSize: '0.78rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Sacred Knowledge
          </p>
          <h1
            className="shimmer-text font-cinzel fw-black mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.1em', lineHeight: 1.15 }}
          >
            VedPath
          </h1>
          <div className="gold-divider mb-3" style={{ margin: '0 0 1.2rem 0' }} />
          <p className="mb-4 fw-light" style={{ color: '#c9b99a', fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', lineHeight: 1.85, maxWidth: '380px' }}>
            Your Gateway to Vedic Treasures. Explore sacred books, mantras &amp; ancient wisdom.
          </p>
          <Link to="/books" style={{ width: 'fit-content' }}>
            <button
              className="btn-gold py-3 px-5"
              style={{ borderRadius: '50px', fontSize: '0.95rem', letterSpacing: '0.08em' }}
            >
              Explore Now ✦
            </button>
          </Link>
        </div>
      </div>

      <TopSellers />
      <Trending />
      <CallToAction />
      <Authors />
    </>
  );
}
