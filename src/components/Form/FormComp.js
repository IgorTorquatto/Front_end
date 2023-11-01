import React from 'react';
import {Link} from 'react-router-dom'
import './FormComp.css'

export const FormComp = () => {
  return (
    <>
      <form>
        <div className="form-group mt-2 formcomp-labels">
          <label htmlFor="exampleFormControlInput1">Nome</label>
          <input type="text" className="form-control formcomp-input" id="exampleFormControlInput1" placeholder="Nome" />
        </div>

        <div className="form-group mt-2 formcomp-labels">
          <label htmlFor="exampleFormControlInput2">Endereço de email</label>
          <input type="email" className="form-control formcomp-input" id="exampleFormControlInput2" placeholder="exemplo@email.com" />
        </div>

        <div className="form-group mt-2 formcomp-labels">
          <label htmlFor="exampleFormControlInput3">Telefone</label>
          <input type="tel" className="form-control formcomp-input" id="exampleFormControlInput3" placeholder="Digite apenas números" pattern="[0-9]*" title="Digite apenas números" />
        </div>

        <div className="form-group mt-2 formcomp-labels">
          <label htmlFor="exampleFormControlSelect1">Especialização</label>
          <select className="form-control formcomp-input" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </form>

      <button className="btn btn-primary mt-5">Cadastrar</button>
      <p className="mt-3">Já possui conta? <Link to="/">Entrar</Link></p>
    </>
  );
};
