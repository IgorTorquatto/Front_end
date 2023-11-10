import React from 'react'
import { NavbarComp } from '../../components/Header/NavbarComp'
import { MyFooter } from '../../components/Footer/Footer'
import './Diagnostico.css'


export const Diagnostico = () => {
  return (
    <div className='page-container'>
      <div>
        <NavbarComp showEntrarButton={true}/>
      </div>
      
      <div className='page-content'>
        <span>Diagnostico page content</span>
      </div>

      <div>
        <MyFooter />
      </div>
      
    </div>
  )
}
