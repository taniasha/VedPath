import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import DisplayTrendingBooks from './DisplayTrendingBooks';
const API_URL = import.meta.env.VITE_API_URL;

export default function Trending() {
  const [trendings, setTrending] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios.get(`${API_URL}/trending/showtrending`)
      .then(res => setTrending(res.data))
      .catch(e => console.log(e));
  }, []);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -270, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 270, behavior: 'smooth' });

  const scrollBtnStyle = {
    background: 'rgba(212,175,55,0.12)',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: '50%',
    width: '40px', height: '40px',
    color: '#d4af37',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', fontSize: '1.1rem', flexShrink: 0,
    transition: 'transform 0.2s',
  };

  return (
    <>
      <section className="section-dark-alt py-5">
        <div className="container">
          <h2 className="section-heading mb-2">Trending Books</h2>
          <div className="gold-divider mb-5" />

          <div className="d-flex align-items-center gap-3">
            <button style={scrollBtnStyle} onClick={scrollLeft}>&#10094;</button>

            <div
              ref={scrollRef}
              className="d-flex scroll-container gap-3 py-2"
              style={{ overflowX: 'auto', flex: 1 }}
            >
              {trendings.map(trending => (
                <div
                  key={trending._id}
                  className="glass-card flex-shrink-0 text-center"
                  style={{ width: '175px', cursor: 'pointer' }}
                  onClick={() => setSelectedBookId(trending._id)}
                >
                  <img
                    src={trending.image}
                    alt={trending.title}
                    className="w-100 object-fit-contain"
                    style={{ height: '190px', background: 'rgba(255,255,255,0.02)' }}
                  />
                  <div className="p-3">
                    <h6 className="font-cinzel fw-semibold mb-1" style={{ color: '#f5e6c8', fontSize: '0.78rem', lineHeight: 1.3 }}>
                      {trending.title}
                    </h6>
                    <p className="mb-1" style={{ color: '#9e8a6e', fontSize: '0.75rem' }}>{trending.author}</p>
                    <p className="fw-bold mb-2" style={{ color: '#d4af37', fontSize: '0.9rem' }}>₹{trending.price}</p>
                    <div className="d-flex justify-content-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`bi ${i < trending.rating ? 'bi-star-fill' : 'bi-star'}`}
                          style={{ color: i < trending.rating ? '#FFD700' : '#555', fontSize: '0.7rem' }} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button style={scrollBtnStyle} onClick={scrollRight}>&#10095;</button>
          </div>
        </div>

        {/* Decorative images */}
        <div className="container mt-5">
          <div className="row g-4 justify-content-center">
            {[
              { src: 'https://vediccosmos.com/wp-content/uploads/2023/04/Hanuman-Chalisa-Library-Edition-600x600.png', alt: 'Hanuman Chalisa' },
              { src: 'https://vediccosmos.com/wp-content/uploads/2023/04/sri-yantra-600x600.png', alt: 'Sri Yantra' },
            ].map(img => (
              <div key={img.alt} className="col-md-5 d-flex justify-content-center">
                <div className="glass-card p-3 text-center" style={{ maxWidth: '380px', width: '100%' }}>
                  <img src={img.src} alt={img.alt} className="img-fluid rounded-3" style={{ maxHeight: '260px', objectFit: 'contain' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedBookId && (
        <DisplayTrendingBooks id={selectedBookId} onClose={() => setSelectedBookId(null)} />
      )}
    </>
  );
}
