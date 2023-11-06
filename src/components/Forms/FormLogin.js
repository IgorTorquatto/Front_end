import React from 'react'
import { Link } from 'react-router-dom';
import './FormLogin.css'

export const FormLogin = () => {
  return (
    <>
    <form>
        <div className="form-group mt-2 ">
          <label htmlFor="exampleFormControl1">Endereço de email</label>
          <input
            type="email"
            className="form-control formcomp-input"
            id="exampleFormControl1"
            placeholder="exemplo@email.com"
          />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="exampleFormControl2">Senha</label>
          <input
            type="password"
            className="form-control formcomp-input"
            id="exampleFormControl2"
            placeholder="Informe sua senha"
          />
        </div>

      </form>

      <div className="form-login-text">
        <Link to="/home">
          <button className="btn btn-primary custom-btn mt-5 mb-4">Entrar</button>
        </Link>
        <p>
          Ainda não possui uma conta? <Link to="/cadastro">Cadastre-se agora</Link>
        </p>
      </div>
    </>
  )
}
