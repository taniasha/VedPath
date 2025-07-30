import React from 'react';
// import imgSrc from '../assets/Gemini_Generated_Image_tm4u3vtm4u3vtm4u.png';
// import imgSrc from '../assets/brown.png';

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
        <h2 className="animated-glow-text">Listen Free Audio of Vedic Chants</h2>
        <p className="animated-subtext">Immerse yourself in divine frequencies and inner peace.</p>
        <button className="listen-btn">Listen Now</button>
      </div>
    </div>


{/* <section>
    <img src={img} alt="" width="80%"/>
</section>
     */}
        </>
        
  );
}

