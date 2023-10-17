import React from 'react';
import { LandComp } from '../../components/LandComp/LandComp';

export const Home = () => {

  return (
    <>
    <LandComp />
    <br></br>
    <p className="text-left text-dark mt-4" style={{ fontSize: '20px' }}>
      Bem-vindo ao Hermes IA, seu parceiro confiável para análise precisa de imagens de raio X. 
      Oferecemos uma solução revolucionária que economiza tempo e melhora a qualidade dos diagnósticos.
    </p>
    <p className="text-left text-dark mt-4" style={{ fontSize: '20px' }}>
      Ao adotar nossa inteligência artificial, você estará na vanguarda da medicina diagnóstica, aproveitando a automação e a precisão para melhorar seu trabalho. 
      Junte-se a nós e experimente a diferença que o Hermes IA pode fazer em sua prática profissional.
    </p>
    </>
  );

};
