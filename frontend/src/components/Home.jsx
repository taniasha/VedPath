import React from 'react'
import TopSellers from './TopSellers'
import Trending from './Trending'
import Authors from './Authors';
import '../index.css';
import { Link } from 'react-router-dom';
import CallToAction from './CallToAction';

export default function Home() {
  return (
    <>
      <div className="home-container">
        <div className="home-image d-flex justify-content-center align-items-center">
          {/* Overlay */}
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></div>

          {/* Text */}
          <div className="text-center text-light" style={{ zIndex: 2, animation: 'fadeInDown 1s ease-out'}} >
            {/* <h1 className="display-5 fw-bold ">VedPath – Your Gateway to Vedic Treasures</h1> */}
            {/* <p className="lead fw-semibold">Explore the sacred wisdom of Vedas & scriptures</p> */}
            {/* <button className="btn mt-3 px-4 py-2 fw-semibold" style={{backgroundColor:'#1a1817ff', color:'#afaba8ff'}}> */}
               {/* <Link style={{textDecoration:'none', color:'#afaba8ff'}} to={"/books"}>Explore Now</Link> */}
            {/* </button> */}
          </div>
        </div>
      </div> 

      <TopSellers/>
      <Trending/>
      <CallToAction/>
      <Authors/>
    </>
  )
}
