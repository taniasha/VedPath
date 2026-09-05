import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default function AudioLibrary() {
  const [audios, setAudios] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const audioRefs = useRef({});

  useEffect(() => {
    axios.get(`${API_URL}/audio/fetch-audio`)
      .then(res => setAudios(res.data.audio))
      .catch(e => console.error('Error fetching audios', e));
  }, []);

  const togglePlay = (id, url) => {
    Object.keys(audioRefs.current).forEach(key => {
      if (key !== id && audioRefs.current[key]) audioRefs.current[key].pause();
    });
    const current = audioRefs.current[id];
    if (!current) {
      const audio = new Audio(url);
      audioRefs.current[id] = audio;
      audio.play();
      setPlayingId(id);
      audio.onended = () => setPlayingId(null);
    } else {
      if (!current.paused) { current.pause(); setPlayingId(null); }
      else { current.play(); setPlayingId(id); current.onended = () => setPlayingId(null); }
    }
  };

  return (
    <div className="section-dark py-5 px-3" style={{ minHeight: '60vh' }}>
      <div className="container">
        <h2 className="section-heading mb-2">
          <i className="bi bi-headphones me-2" />Listen to Mantras For Free
        </h2>
        <div className="gold-divider mb-5" />

        <div className="row justify-content-center g-4">
          {audios.map(audio => (
            <div key={audio._id} className="col-12 col-sm-6 col-lg-4">
              <div className="glass-card p-4 h-100">
                <h5 className="font-cinzel fw-semibold mb-1" style={{ color: '#f5e6c8', fontSize: '0.95rem' }}>
                  {audio.title}
                </h5>
                <p className="mb-3" style={{ color: '#9e8a6e', fontSize: '0.85rem' }}>{audio.scripture}</p>
                <div className="d-flex gap-2">
                  <button
                    className="btn-gold py-2 px-3 flex-fill"
                    style={{ borderRadius: '8px', fontSize: '0.85rem' }}
                    onClick={() => togglePlay(audio._id, audio.audioUrl)}
                  >
                    {playingId === audio._id ? '⏸ Pause' : '▶ Play'}
                  </button>
                  <a
                    href={audio.audioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-outline py-2 px-3 flex-fill text-center"
                    style={{ borderRadius: '8px', fontSize: '0.85rem', display: 'inline-block' }}
                  >
                    Open Link
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
