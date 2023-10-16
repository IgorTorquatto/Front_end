import React, { useState } from 'react';
import videoFile from '../assets/SaveTube.io-4k background footage Ae plugin plexus-(1080p).mp4'
import './LandComp.css'
import { Link } from 'react-router-dom';

export const LandComp = () => {
  const [videoPlaying, setVideoPlaying] = useState(true);

  const toggleVideo = () => {
    setVideoPlaying(!videoPlaying);
    const video = document.getElementById('background-video');
    if (videoPlaying) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="home-container">
      <video id="background-video" autoPlay loop muted>
        <source src={videoFile} type="video/mp4" />
        Seu navegador não suporta vídeos em HTML5.
      </video>
      <div className="center-content">
      <Link to="/cadastro"><button>Entrar</button></Link>
      </div>
    </div>
  );
};

