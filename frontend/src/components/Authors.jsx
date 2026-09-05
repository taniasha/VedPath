import React from 'react';

export default function Authors() {
  const authors = [
    {
      name: 'Dr. Vasudha Narayanan',
      role: 'Vedic Scholar',
      books: '12 Books',
      img: 'https://i.pravatar.cc/200?img=47',
    },
    {
      name: 'Shantanu Gupta',
      role: 'Ancient Historian',
      books: '8 Books',
      img: 'https://i.pravatar.cc/200?img=12',
    },
    {
      name: 'Ajay Chaturvedi',
      role: 'Sanskrit Expert',
      books: '15 Books',
      img: 'https://i.pravatar.cc/200?img=68',
    },
    {
      name: 'Ananda K. Coomaraswamy',
      role: 'Art Philosopher',
      books: '20 Books',
      img: 'https://i.pravatar.cc/200?img=53',
    },
  ];

  return (
    <section
      id="authors-section"
      style={{ background: 'linear-gradient(to bottom, #100c08, #0d0a07)' }}
      className="py-5 px-3"
    >
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">
          <p style={{ color: '#9e8a6e', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Meet the Minds
          </p>
          <h2 className="section-heading mb-2">Top Authors</h2>
          <div className="gold-divider mt-2" />
        </div>

        {/* Author Cards */}
        <div className="row justify-content-center g-4">
          {authors.map((author, index) => (
            <div
              key={index}
              className="col-6 col-md-3"
              data-aos="fade-up"
              data-aos-delay={index * 130}
              data-aos-duration="700"
              data-aos-once="false"
            >
              <div
                className="text-center position-relative"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(212,175,55,0.18)',
                  borderRadius: '20px',
                  padding: '2rem 1rem 1.5rem',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.45)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.18)';
                }}
              >
                {/* Gold ring + avatar */}
                <div
                  className="mx-auto mb-3"
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    padding: '3px',
                    background: 'linear-gradient(135deg, #d4af37, #f0c84a, #a07820)',
                  }}
                >
                  <img
                    src={author.img}
                    alt={author.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #0d0a07',
                    }}
                  />
                </div>

                {/* Name */}
                <h6
                  className="font-cinzel fw-bold mb-1"
                  style={{ color: '#f5e6c8', fontSize: '0.9rem', lineHeight: 1.3 }}
                >
                  {author.name}
                </h6>

                {/* Role */}
                <p style={{ color: '#9e8a6e', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                  {author.role}
                </p>

                {/* Gold divider */}
                <div style={{
                  width: '40px', height: '1px',
                  background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                  margin: '0 auto 0.75rem',
                }} />

                {/* Books badge */}
                <span
                  style={{
                    background: 'rgba(212,175,55,0.1)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    color: '#d4af37',
                    fontSize: '0.7rem',
                    padding: '3px 12px',
                    borderRadius: '20px',
                    letterSpacing: '0.05em',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {author.books}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
