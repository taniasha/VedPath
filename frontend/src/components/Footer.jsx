import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      className="text-center py-5 w-100"
      style={{
        background: 'linear-gradient(to top, #0a0703, #16110c)',
        borderTop: '1px solid rgba(212,175,55,0.15)',
      }}
    >
      <p className="shimmer-text font-cinzel fw-bold mb-2" style={{ fontSize: '1.4rem', letterSpacing: '0.2em' }}>
        VedPath
      </p>
      <div className="gold-divider mb-3" />
      <p className="mb-3" style={{ color: '#9e8a6e', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
        &copy; 2026 VedPath. &nbsp; All rights reserved. &nbsp; Designed with devotion.
      </p>
    </footer>
  );
}
