import React, { useState } from 'react';
import videoFile from '../../assets/SaveTube.io-4k background footage Ae plugin plexus-(1080p).mp4'
import './Video.css'
import { Link } from 'react-router-dom';
import { Button} from '@chakra-ui/react'

export const Video = () => {
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
    <div className="videocomp-container">
      <div className="videocomp-video">
        <video id="background-video" autoPlay loop muted>
          <source src={videoFile} type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>
      </div>
      <div className="center-content">
      <Link to="/login">
        <Button className='videoButton' variant='outline' colorScheme='white'>Entrar</Button>
      </Link>
      </div>
      <div className="videocomp-gradient"></div>
    </div>
  );
};

