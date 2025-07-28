import { Link } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import { useContext } from 'react';
export default function TopSellers() {

     const books = [
    {id:1, title:'The GuruGita', img:'https://vediccosmos.com/wp-content/uploads/2023/04/Guru-Gita-A6-600x600.png'},
    {id:2, title:'Vedic India', img:'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTXqELLnilBLRNKFYm9LOTidw4cYlUu3bZhl0ArekEAwueSJLoaVxqpYQJApszjqXUHA87Q_Z_sZ5QEdAJOSH7W7AqsZ4A7v4tzc0z75us'},
    {id:3, title:'Vedic Puranic View', img:'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSM2cMoYSxvAm_YT3CbSNSAtuz-7u_glwIl7Fq6h1aoMMQLN-zsk3JCE6V8K21FO0Jf8mNKGNEdsnX8RioGds8BsZhfXA31ruk3Ftk5A6QaRzBbTBSLhze_nA'},
    {id:4, title:'History of India', img:'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQRCmdiVqWuCM-UQpAMTUfE4lOPB4B8GS-pdxj82omTxmscj_9xhykDienrIQnXx-BjpD1fq0nXgACvpkM6Glarg7c0gQbsPLFy90A4perZ00xEUANDFhY'}
  ]
 
  const {theme} = useContext(ThemeContext);

  return (
    <>
        
{/* Top Sellers */}
         <div className="main-content justify-content-center p-5" style={{ backgroundColor: 'cream' }}>
  <h2 className="text-center mb-3 fw-bolder page-heading" style={{color:  theme==='dark'? 'white': '#3E2723' }}>Top Sellers</h2>

  <div className="container">
    <div className="row justify-content-center g-3">
      {books.map((book) => (
   <div className="col-6 col-md-4 col-lg-3 col-xs-12" key={book.id}>
  <Link to="/books" style={{ textDecoration: 'none', color: 'black' }}>
    <div
      className="card" data-aos="zoom-in" data-aos-duration="1000"
      style={{
        borderRadius: '1rem',
        overflow: 'hidden',
        margin: '0 auto',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      <div
        className="card-body"
        style={{
          padding: 0,
          height: '12rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fdf8f1', // optional
        }}
      >
        <img
          src={book.img}
          alt={book.title}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
      <div
        className="card-footer text-center"
        style={{ fontStyle: 'italic', padding: '0.5rem', backgroundColor: 'transparent' }}
      >
        {book.title}
      </div>
    </div>
  </Link>
</div>



      ))}
    </div>
  </div>
</div>

    </>
  )
}

