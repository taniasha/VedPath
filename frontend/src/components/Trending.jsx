import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useRef } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import DisplayTrendingBooks from "./DisplayTrendingBooks";
import ThemeContext from "../context/ThemeContext";

export default function Trending() {
  const {theme} = useContext(ThemeContext);
  const [trendings, setTrending] = useState([]);
  const[selectedBookId, setSelectedBookId] = useState(null);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/trending/showtrending")
      .then((response) => {
        setTrending(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  // const handleSubmit=(id)=>{
  //   navigate(`/trending/${id}`);
  // };

  const handleCardClick=(id)=>{
    setSelectedBookId(id); //open modal with this book id
  };

  const handleClose=()=>{
    setSelectedBookId(null); //close modal
  }
  return (
    <>

    {/* Trendingsection */}
      <div className="trending-section mt-5 mb-3 container" style={{overflow:'hidden'}}>
        <h2 className="text-center mb-4 fw-bold page-heading" style={{color: theme==='dark' ? 'white': '#3E2723', fontFamily: "'Niconne', cursive", fontSize: '46px'}}> Trending Books</h2>
       {/* <h2 className="text-center mb-4 fw-bold d-flex align-items-center" style={{backgroundColor:'#3E2723', width:'100%', height:'3.5rem', color:'white'}}>🔥 Trending Books</h2> */}

         <div className="scroll-wrapper position-relative">
          {/* Scroll Left Button */}
          <button className="btn btn-light scroll-btn left" onClick={scrollLeft}>
            &#10094;
          </button>

          {/* Scrollable Card Container */}
        <div className="d-flex overflow-x-auto overflow-y-hidden scroll-container " ref={scrollRef} style={{ scrollBehavior: 'smooth', gap: '1rem' }} >
          {trendings.map((trending) => (
            <div className="card trending-card flex-shrink-0" style={{ width: "13rem" }} key={trending._id} onClick={() => handleCardClick(trending._id)} >
              <img src={trending.image} className="card-img-top" alt={trending.title} style={{ height: "200px", objectFit: "contain" }}/>

              <div className="card-body text-center p-2">
                  <h6 className="card-title mb-1">{trending.title}</h6>
                  <p className="card-text mb-1 text-muted">{trending.author}</p>
                  <p className="fw-bold text-brown mb-1">₹{trending.price}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <i
                      key={i}
                      className={`bi ${i < trending.rating ? 'bi-star-fill' : 'bi-star'}`}
                      style={{ color: i < trending.rating ? '#FFD700' : '#ccc' }}
                      ></i>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Right Button */}
        <button className="btn btn-light scroll-btn right" onClick={scrollRight}>
          &#10095;
        </button>
     </div>
   </div>


   {/* Popup modal when a card is clicked */}
       {selectedBookId && (
        <DisplayTrendingBooks id={selectedBookId} onClose={handleClose}/>
       )}


      {/* Atrractive-section */}
    <section className="container my-5 attractive-section">
        <div className="row g-4">
            <div className="col-lg-6 d-flex justify-content-center">
                <div className="image-card">
                    <img
                    src="https://vediccosmos.com/wp-content/uploads/2023/04/Hanuman-Chalisa-Library-Edition-600x600.png"
                    alt="Hanuman Chalisa"
                    className="img-fluid"
                    />
                </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-center">
                <div className="image-card">
                    <img
                    src="https://vediccosmos.com/wp-content/uploads/2023/04/sri-yantra-600x600.png"
                    alt="Sri Yantra"
                    className="img-fluid"
                    />
                </div>
            </div>
        </div>
    </section>

          
     
    </>
  );
}
