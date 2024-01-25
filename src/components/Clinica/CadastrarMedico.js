import React from 'react'
import { FormCadastro } from '../Forms/FormCadastro'
import './CadastrarMedico.css'

export const CadastrarMedico = () => {
  return (
  <>
  <div className="cadastrarMedico-container">
    <div className="cadastrarMedico-title">
      <h2>Cadastrar Médico</h2>
    </div>
    <div className="cadastrarMedico-formulario">
      <FormCadastro/>
    </div>
  </div>
  </>
  )
}
