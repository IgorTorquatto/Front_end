import React, { useState } from 'react';
import videoFile from '../../assets/SaveTube.io-4k background footage Ae plugin plexus-(1080p).mp4';
import './Video.css';
import { Link } from 'react-router-dom';
import { Button} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

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

  const Entrar = () => {
    const { data: user } = useSelector((state) => state.tokens);

    let visibility = 'visible'
    let link = '/login'
    if (user.token) {
      visibility = 'hidden'
      link = '/'
    }

    return (
      <Link to={link}>
        <Button visibility={visibility} className='videoButton' variant='outline' colorScheme='white'>Entrar</Button>
      </Link>
    )
  }
  

  return (
    <div className="videocomp-container">
      <div className="videocomp-video">
        <video id="background-video" autoPlay loop muted>
          <source src={videoFile} type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>
      </div>
      <div className="center-content">
        <Entrar/>
      </div>
      <div className="videocomp-gradient"></div>
    </div>
  );
};

