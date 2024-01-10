import React from 'react'
import './ClinicaAlterarSenha.css'

export const ClinicaAlterarSenha = () => {

  const handleCancelarClick = () => {
    window.location.reload();
  };
 
  return (
    <>
    <div className="clinicaAlterarSenha-container">
        <h2>Alterar Senha</h2>
        <form
          className="custom-formcomp mt-4"
        >
          <div className="clinica-row">
            <div className="col-md-6 clinicaAlterarSenha-inputs">
              <div className="form-group mt-2">
                <label htmlFor="FormControlInputSenha">Senha</label>
                <input
                  type="password"
                  className="form-control formcomp-input"
                  id="FormControlInputSenha"
                  placeholder="Informe sua nova senha"
                />
              </div>

              <div className="form-group mt-5">
                <label htmlFor="FormControlInputConfirmarSenha">
                  Confirmar senha
                </label>
                <input
                  type="password"
                  className="form-control formcomp-input"
                  id="FormControlInputConfirmarSenha"
                  placeholder="Informe sua nova senha novamente"
                />
              </div>
            </div>
          </div>

          <div className="clinicaAlterarSenha-buttons">
            <button type="submit" className="btn-salvar">
              Atualizar dados
            </button>
            <button type="button" className="btn-cancelar" onClick={handleCancelarClick}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
