import React from 'react'
import './Cadastro.css'
import { FormCadastro } from '../../components/Forms/FormCadastro'

export const Cadastro = () => {
  return (
    <>
    <div className="cadastro-container">
        <div className="cadastro-background-image"></div>
        <div className="cadastro-section">
            <h2>Cadastro</h2>
            <div className="cadastro-form">
              <FormCadastro/>
            </div>
        </div>
    </div>
    </>
  )
}
