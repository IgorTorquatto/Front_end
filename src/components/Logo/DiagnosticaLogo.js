import React from 'react'
import './DiagnosticaLogo.css'
import logo from '../../assets/noto_lungs.png'

export const DiagnosticaLogo = () => {
  return (
    <div className='logo-context'> 
        <img src={logo} className='image' alt="Logo" />
        <span className="brand-name">d.<span className='text-ia'>IA</span>gnóstica</span>
    </div>
  );
}