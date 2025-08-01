import React from 'react';
import { Link } from 'react-router-dom';

import imgSrc from '../assets/Gemini_Generated_Image_gxcs21gxcs21gxcs.png'
import img from '../assets/om.png';

export default function AudioPromo() {
  return (
    <>
    <div className="audio-banner my-5">
      <img
        src={imgSrc}
        alt="Cosmic Vibes"
        className="audio-bg-img"
        />
      <div className="audio-content text-center">
        <h2 className="animated-glow-text" style={{fontFamily: "'Niconne', cursive", fontSize: '60px'}}>Listen Free Audio of Vedic Chants</h2>
        <p className="animated-subtext" style={{fontFamily: "'Niconne', cursive", fontSize: '40px'}}>Immerse yourself in divine frequencies and inner peace.</p>
        <button className="listen-btn" style={{fontFamily: "'Niconne', cursive", fontSize: '28px', padding:'12px'}}><Link to="/audio"  style={{textDecoration:'none', color:'white'}}>Listen Now</Link></button>
      </div>
    </div>


{/* <section>
    <img src={img} alt="" width="80%"/>
</section>
     */}
        </>
        
  );
}

