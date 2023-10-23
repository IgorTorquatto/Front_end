import React from 'react';
import { LandComp } from '../../components/LandComp/LandComp';
import './Home.css'
import { NavbarComp } from '../../components/Header/NavbarComp';

export const Home = () => {

  return (
    <>
    <div className="home-container">
      <div className="home-navbar">
        <header><NavbarComp customClass="navbar-transparent" /></header>
      </div>
      <div className="home-landcomp">
        <LandComp />
      </div>
    </div>
    <div className='custom-paragraphs'>
    <div className='rectangle'></div>
    <p className="text-left text-dark mt-4">
      Bem-vindo ao Hermes IA, seu parceiro confiável para análise precisa de imagens de raio X. 
      Oferecemos uma solução revolucionária que economiza tempo e melhora a qualidade dos diagnósticos.
    </p>
    <p className="text-left text-dark mt-4">
      Ao adotar nossa inteligência artificial, você estará na vanguarda da medicina diagnóstica, aproveitando a automação e a precisão para melhorar seu trabalho. 
      Junte-se a nós e experimente a diferença que o Hermes IA pode fazer em sua prática profissional.
    </p>
    </div>
    </>
  );

};
