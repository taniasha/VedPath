import { Link } from 'react-router-dom';

export default function TopSellers() {
  const books = [
    { id: 1, title: 'The GuruGita', img: 'https://vediccosmos.com/wp-content/uploads/2023/04/Guru-Gita-A6-600x600.png' },
    { id: 2, title: 'Vedic India', img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTXqELLnilBLRNKFYm9LOTidw4cYlUu3bZhl0ArekEAwueSJLoaVxqpYQJApszjqXUHA87Q_Z_sZ5QEdAJOSH7W7AqsZ4A7v4tzc0z75us' },
    { id: 3, title: 'Vedic Puranic View', img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSM2cMoYSxvAm_YT3CbSNSAtuz-7u_glwIl7Fq6h1aoMMQLN-zsk3JCE6V8K21FO0Jf8mNKGNEdsnX8RioGds8BsZhfXA31ruk3Ftk5A6QaRzBbTBSLhze_nA' },
    { id: 4, title: 'History of India', img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQRCmdiVqWuCM-UQpAMTUfE4lOPB4B8GS-pdxj82omTxmscj_9xhykDienrIQnXx-BjpD1fq0nXgACvpkM6Glarg7c0gQbsPLFy90A4perZ00xEUANDFhY' },
  ];

  return (
    <section style={{ background: 'linear-gradient(to bottom, #0d0a07, #120e08)' }} className="py-5 px-3">
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">
          <p style={{ color: '#9e8a6e', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Curated For You
          </p>
          <h2 className="section-heading mb-2">Top Sellers</h2>
          <div className="gold-divider mt-2" />
        </div>

        {/* Cards */}
        <div className="row justify-content-center g-4">
          {books.map((book, index) => (
            <div
              key={book.id}
              className="col-6 col-md-3"
              data-aos="fade-up"
              data-aos-delay={index * 130}
              data-aos-duration="700"
              data-aos-once="false"
            >
              <Link to="/books">
                <div
                  className="position-relative text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(212,175,55,0.18)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 24px 50px rgba(0,0,0,0.6), 0 0 25px rgba(212,175,55,0.12)';
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.18)';
                  }}
                >
                  {/* Rank Badge */}
                  <div
                    className="position-absolute d-flex align-items-center justify-content-center font-cinzel fw-bold"
                    style={{
                      top: '12px', left: '12px',
                      width: '30px', height: '30px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #d4af37, #f0c84a)',
                      color: '#0d0a07',
                      fontSize: '0.75rem',
                      zIndex: 2,
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Image area */}
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      height: '210px',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
                      padding: '1rem',
                    }}
                  >
                    <img
                      src={book.img}
                      alt={book.title}
                      style={{
                        maxHeight: '185px',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        transition: 'transform 0.4s ease',
                        filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.5))',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>

                  {/* Footer */}
                  <div
                    className="px-3 py-3"
                    style={{
                      borderTop: '1px solid rgba(212,175,55,0.12)',
                      background: 'rgba(0,0,0,0.25)',
                    }}
                  >
                    <p className="font-cinzel mb-1 fw-semibold" style={{ color: '#f5e6c8', fontSize: '0.82rem', lineHeight: 1.4 }}>
                      {book.title}
                    </p>
                    <p style={{ color: '#d4af37', fontSize: '0.7rem', letterSpacing: '0.15em', margin: 0, textTransform: 'uppercase' }}>
                      View Book →
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
