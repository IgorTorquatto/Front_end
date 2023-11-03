import React from 'react'
import { Link } from 'react-router-dom';
import './FormLogin.css'

export const FormLogin = () => {
  return (
    <>
    <form>
        <div className="formLogin-title">
          <h2>Seja Bem-Vindo</h2>
        </div>
        <div className="form-group mt-2 formcomp-labels">
          <label htmlFor="exampleFormControl1">
            <i className="mdi mdi-email"></i> Endereço de email
          </label>
          <input
            type="email"
            className="form-control formcomp-input"
            id="exampleFormControl1"
            placeholder="exemplo@email.com"
          />
        </div>

        <div className="form-group mt-2 formcomp-labels">
          <label htmlFor="exampleFormControl2">Senha</label>
          <input
            type="password"
            className="form-control formcomp-input"
            id="exampleFormControl2"
            placeholder="Informe sua senha"
          />
        </div>
      </form>

      <button className="btn btn-primary mt-3">Entrar</button>
      <p className="">
        Ainda não possui uma conta? <Link to="/cadastro">Cadastre-se agora</Link>
      </p>
    </>
  )
}
