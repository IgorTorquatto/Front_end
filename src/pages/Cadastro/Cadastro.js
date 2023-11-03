import React from 'react'
import './Cadastro.css'
import { FormCadastro } from '../../components/Forms/FormCadastro'

export const Cadastro = () => {
  return (
    <>
    <div className="cadastro-container">
        <div className="cadastro-background-image"></div>
        <div className="cadastro-medico">
            <h4>Cadastro</h4>
            <FormCadastro/>
        </div>
    </div>
    </>
  )
}
