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

          <div className="imageStyle">
            <div className="sobreNosTexto">Sobre nós</div>
          </div>

          <section className="d-flex containerStyle">
            
              <div className="retanguloStyle"></div>
              <div className="tituloContainerStyle">
              <h1 className="tituloStyle">
                Somos a dIAgnostica e acreditamos que a tecnologia deve ser usada para o bem da humanidade.
              </h1>
              </div>

          </section>
          
          <section>
              <p className="paragrafoStyle">
                 Nossa missão é auxiliar os médicos a salvarem vidas através da aplicação da inteligência artificial na detecção precoce e precisa de doenças pulmonares e criar um mundo onde essas doenças possam ser diagnosticadas e tratadas com rapidez, melhorando a qualidade de vida de milhões de pessoas.
              </p>
          </section>

        </main>

    </div>

    </>
  );
};
