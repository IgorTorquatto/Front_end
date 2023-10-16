import React from 'react';
import image from '../assets/img_backgorund_sobre.png';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '50px',
  marginLeft: '40px',
};

const retanguloStyle = {
  width: '9px',
  height: '188px',
  flexShrink: 0,
  backgroundColor: '#0B2A45',
};

const tituloStyle = {
  fontSize: '25px',
  textAlign: 'center',
  marginLeft: '20px',
};

const tituloContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const paragrafoStyle = {
  marginTop: '40px',
  marginLeft: '40px',
  marginBottom: '100px',
  fontSize: '20px',
};

const imagemStyle = {
  position: 'relative',
};

const sobreNosTextoStyle = {
  position: 'absolute',
  bottom: '40px', 
  left: '30px', 
  fontSize: '40px',
  fontWeight: 'bold',
  color: 'white',
};

export const Sobre = () => {
  return (
    <div>
      <div >
        <div style={imagemStyle}>
          <img src={image}  alt="Sobre nós" />
          <div style={sobreNosTextoStyle}>Sobre nós</div>
        </div>
        <div className="d-flex" style={containerStyle}>
          <div style={retanguloStyle}></div>
          <div style={tituloContainerStyle}>
            <h1 style={tituloStyle}>Somos a Hermes IA e acreditamos que a tecnologia deve ser usada para o bem da humanidade.</h1>
          </div>
        </div>
        <p style={paragrafoStyle}>Nossa missão é auxiliar os médicos a salvarem vidas através da aplicação da inteligência artificial na detecção precoce e precisa de doenças pulmonares
           e criar um mundo onde essas doenças possam ser diagnosticadas e tratadas com rapidez, melhorando a qualidade de vida de milhões de pessoas.</p>
      </div>
    </div>
  );
};
