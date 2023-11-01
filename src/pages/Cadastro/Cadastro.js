import React from 'react'
import './Cadastro.css'
import { FormComp } from '../../components/Form/FormComp'

export const Cadastro = () => {
  return (
    <>
    <div className="cadastro-container">
        <div className="cadastro-backgorund-image"></div>
        <div className="cadastro-medico">
            <h4>Cadastro</h4>
            <FormComp/>
        </div>
    </div>
    </>
  )
}
