import React from 'react'
import { Link } from 'react-router-dom';
import './FormLogin.css'

export const FormLogin = () => {
  return (
    <>
    <form className="custom-formcomp">
        <div className="form-group mt-2 ">
          <label htmlFor="exampleFormControl1">Endereço de email</label>
          <input
            type="email"
            className="form-control formcomp-input"
            id="exampleFormControl1"
            placeholder="exemplo@email.com"
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="exampleFormControl2">Senha</label>
          <input
            type="password"
            className="form-control formcomp-input"
            id="exampleFormControl2"
            placeholder="Informe sua senha"
          />
        </div>

        <p className="login-forget-password mt-3">
          <Link to="/">Esqueceu sua senha?</Link>
        </p>

      </form>

      <div className="form-login-text">
        <Link to="/home">
          <button className="btn btn-primary custom-btn mt-3 mb-4">Entrar</button>
        </Link>
        <p>
          Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se agora</Link>
        </p>
      </div>
    </>
  )
}
