import React from 'react'
import './DiagnosticaLogo.css'
import logo from '../../assets/noto_lungs.png'
import { useNavigate } from 'react-router-dom';

export const DiagnosticaLogo = () => {
  
  const navigate = useNavigate();

  const navigateToPage = (path) => {
    navigate(path); // Navega para a página especificada
  };

  return (
    <div id='logo-context' onClick={() => {navigateToPage('/')}}> 
        <img src={logo} className='image' alt="Logo" />
        <span className="brand-name">d.<span className='text-ia'>IA</span>gnóstica</span>
    </div>
  );
}