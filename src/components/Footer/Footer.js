import React from 'react'
import './Footer.css'
import { DiagnosticaLogo } from '../Logo/DiagnosticaLogo'
import { FaLocationDot, FaPhone, FaEnvelope, FaLinkedinIn, FaFacebook, FaInstagram} from 'react-icons/fa6'


export const MyFooter = () => {
  const openLink = (url) => {
    window.open(url, '_blank'); // Abre o link em uma nova aba
  };

  return (
    <div className='footer-container'>
      
      <div className='main-content'>
        <div className='logo-context'>
          <DiagnosticaLogo />
        </div>
        <div className='company-info'>
        <div className='social-medias'>
          <span className='footer-text'>
            Redes Sociais:
          </span>
          <div className='social-media-context' onClick={() => openLink('https://www.instagram.com/')}>
            <FaInstagram className='icon' />
            <span className='footer-text'>@exemplo</span>
          </div>
          <div className='social-media-context' onClick={() => openLink('https://www.linkedin.com/')}>
            <FaLinkedinIn className='icon' />
            <span className='footer-text'>Exemplo</span>
          </div>
          <div className='social-media-context' onClick={() => openLink('https://www.facebook.com/')}>  
            <FaFacebook className='icon' />
            <span className='footer-text'>Exemplo</span>
          </div>
        </div>
          <div className='contact'>
            <div className='phone'>
              <FaPhone className='icon' />
              <span className='footer-text'>(88) 98888-8888</span>
            </div>
            <div className='email'>
              <FaEnvelope className='icon' />
              <span className='footer-text'>exemplodeemail@gmail.com</span>
            </div>
          </div>
          <div className='location' onClick={() => openLink('https://maps.app.goo.gl/ocJoRj6kGdzqgTj59')}>
            <FaLocationDot className='icon'/> 
            <span className='footer-text'>Av. Ten. Raimundo Rocha, 1639 - Cidade Universitária, Juazeiro do Norte - CE</span>
          </div>
        </div>
      </div>
      <div className='copyright-context'>
        <span className='footer-text copyright'>Copyright © 2023 • Alguma Empresa</span>
      </div>
    </div>
  )
}
