import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function AudioLibrary() {
  const [audios, setAudios] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const audioRefs = useRef({});

  // Fetch audio data from backend
  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const res = await axios.get('http://localhost:5000/audio/fetch-audio')

        setAudios(res.data.audio);
      } catch (e) {
        console.error("Error fetching audios", e);
      }
    };
    fetchAudios();
  }, []);

  // Play or pause selected audio, pause others
  const togglePlay = (id, url) => {
    // Pause other audios
    Object.keys(audioRefs.current).forEach((key) => {
      if (key !== id && audioRefs.current[key]) {
        audioRefs.current[key].pause();
      }
    });

    const currentAudio = audioRefs.current[id];

    if (!currentAudio) {
      // First time: create and play
      const newAudio = new Audio(url);
      audioRefs.current[id] = newAudio;
      newAudio.play();
      setPlayingId(id);

      newAudio.onended = () => setPlayingId(null);
    } else {
      // Toggle play/pause
      if (!currentAudio.paused) {
        currentAudio.pause();
        setPlayingId(null);
      } else {
        currentAudio.play();
        setPlayingId(id);
        currentAudio.onended = () => setPlayingId(null);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-dark mb-5">🎵 Listen to Mantras For Free</h2>
      <div className="row justify-content-center align-items-center">
        {audios.map((audio) => (
          <div className="col-md-4 col-lg-4 col-sm-12 mb-4" key={audio._id}>
            <div className="card shadow border-primary">
              <div className="card-body">
                <h5 className="card-title">{audio.title}</h5>
                <p className="card-text text-muted">{audio.scripture}</p>
                <div className="d-flex align-items-center gap-3">
                  <button
                    className="btn book-btn"
                    onClick={() => togglePlay(audio._id, audio.audioUrl)}
                  >
                    {playingId === audio._id ? '⏸ Pause' : '▶ Play'}
                  </button>
                  <a
                    href={audio.audioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn book-btn "
                  >
                    Open Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
