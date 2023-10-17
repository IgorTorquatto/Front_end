import React from 'react';
import './Sobre.css';

export const Sobre = () => {
  return (
    <div>
      <div>
        <div className="imageStyle">
          <div className="sobreNosTexto">Sobre nós</div>
        </div>
        <div className="d-flex containerStyle">
          <div className="retanguloStyle"></div>
          <div className="tituloContainerStyle">
            <h1 className="tituloStyle">
              Somos a Hermes IA e acreditamos que a tecnologia deve ser usada para o bem da humanidade.
            </h1>
          </div>
        </div>
        <p className="paragrafoStyle">
          Nossa missão é auxiliar os médicos a salvarem vidas através da aplicação da inteligência artificial na detecção precoce e precisa de doenças pulmonares e criar um mundo onde essas doenças possam ser diagnosticadas e tratadas com rapidez, melhorando a qualidade de vida de milhões de pessoas.
        </p>
      </div>
    </div>
  );
};
