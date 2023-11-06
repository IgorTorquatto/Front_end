import React from 'react';
import { Link } from 'react-router-dom';
import './FormCadastro.css';

export const FormCadastro = () => {
  return (
    <>
      <form className="mt-4">
        <div className="form-group mt-2 ">
          <label htmlFor="exampleFormControlInput1">Nome</label>
          <input
            type="text"
            className="form-control formcomp-input"
            id="exampleFormControlInput1"
            placeholder="Digite seu nome completo"
          />
        </div>

        <div className="form-group mt-2 ">
          <label htmlFor="exampleFormControlInput2"> Endereço de email</label>
          <input
            type="email"
            className="form-control formcomp-input"
            id="exampleFormControlInput2"
            placeholder="exemplo@email.com"
          />
        </div>

        <div className="form-group mt-2 ">
          <label htmlFor="exampleFormControlInput3"> Telefone</label>
          <input
            type="tel"
            className="form-control formcomp-input"
            id="exampleFormControlInput3"
            placeholder="(99) 9 9999-9999"
            pattern="[0-9]*"
            title="Digite apenas números"
          />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="exampleFormControlSelect1">Especialização</label>
          <select
            className="form-control formcomp-input"
            id="exampleFormControlSelect1"
          >
            <option value="" disabled selected>
              Escolha um dos itens listados
            </option>
            <option value="1">Opção 1</option>
            <option value="2">Opção 2</option>
            <option value="3">Opção 3</option>
            <option value="4">Opção 4</option>
            <option value="5">Opção 5</option>
          </select>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="exampleFormControlInput4">Senha</label>
          <input
            type="password"
            className="form-control formcomp-input"
            id="exampleFormControlInput4"
            placeholder="Informe sua senha"
          />
        </div>
      </form>

      <div className="form-cadastro-text mt-5">
        <Link to="/home">
          <button className="btn btn-primary custom-btn">Cadastrar</button>
        </Link>
        <p>
          Já possui conta? <Link to="/login">Entrar agora</Link>
        </p>
      </div>
    </>
  );
};
