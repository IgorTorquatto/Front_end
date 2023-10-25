import React from 'react';
import './Sobre.css';
import { NavbarComp } from '../../components/Header/NavbarComp';

export const Sobre = () => {
  return (
    <>

    <div className="sobre-container">

        <header>
            <nav><NavbarComp showEntrarButton={true}/></nav>
        </header>

        <main>

          <div className="sobre-imagem">
            <div className="sobre-texto">Sobre nós</div>
          </div>

          <section className="d-flex sobre-secao1">
            
              <div className="sobre-retangulo"></div>
              <div className="sobre-container-h1">
              <h1 className="sobre-h1">
                Somos a dIAgnostica e acreditamos que a tecnologia deve ser usada para o bem da humanidade.
              </h1>
              </div>

          </section>
          
          <section>
              <p className="sobre-paragrafo">
                 Nossa missão é auxiliar os médicos a salvarem vidas através da aplicação da inteligência artificial na detecção precoce e precisa de doenças pulmonares e criar um mundo onde essas doenças possam ser diagnosticadas e tratadas com rapidez, melhorando a qualidade de vida de milhões de pessoas.
              </p>
          </section>

        </main>

    </div>

    </>
  );
};
