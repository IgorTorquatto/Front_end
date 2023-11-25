import React from 'react'
import './Footer.css'
import { DiagnosticaLogo } from '../Logo/DiagnosticaLogo'
import { FaEnvelope, FaGithub} from 'react-icons/fa6'

export const MyFooter = () => {

  return (
    <div class="container-fluid footer_container pt-5">
      <div class="row justify-content-around mb-5">
        <div class="col-md-auto d-flex my-3 f-logo_context">
          <DiagnosticaLogo />
        </div>  

        <div class="col-md-auto my-3">
          <h5 style={{color: '#F8F8FF'}}>Informações</h5>
          <div class="footer_item">
            <FaEnvelope className='f_icon' />
            <span className='footer_text'>residenciaticgia@gmail.com</span>
          </div>
          <a class="footer_item" href='https://github.com/grupodiagnostica' target='_blank'>
            <FaGithub className='f_icon' />
            <span className='footer_text'>GitHub/Diagnóstica</span>
          </a>
        </div>

        <div class="col-md-auto mr-10 my-3">
          <h5 style={{color: '#F8F8FF'}}>Grupo Diagnóstica</h5>
          <a className='f_location' href='https://maps.app.goo.gl/ocJoRj6kGdzqgTj59' target='_blank'>
            <span className='footer_text'>Av. Tenente Raimundo Rocha Nº 1639,</span>
            <span className='footer_text'>Bairro Cidade Universitária,</span>
            <span className='footer_text'>Juazeiro do Norte - Ceará</span>
          </a>
        </div>
      </div>
      <div class="col-md text-center" style={{color: '#f8f8ffb0', fontSize:'smaller'}}>
        Copyright © 2023
      </div>
    </div>
  )
}
