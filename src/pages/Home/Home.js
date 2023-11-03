import React from 'react';
import { Video } from '../../components/Video/Video';
import './Home.css'
import { NavbarComp } from '../../components/Header/NavbarComp';
import { Card } from '../../components/Cards/Card';

export const Home = () => {

  return (
    <>
    <div className="home-container">

      <div className="home-navbar">
        <header>
          <nav><NavbarComp customClass="home-navbar-transparent" showEntrarButton={false} /></nav>
        </header>
      </div>

      <main>

        <section>
           <div className="home-videocomp">
              <div className="video-title">
                <h1 className="font-weight-bold">ferramenta médica para análises de raio-x</h1>
              </div>
              <Video />
              <br></br>
            </div>
        </section>

        <section>
          <div className="section1-title">
            <h1 className="text-white display-6 mb-5 mt-3">Por que contar com a dIAgnostica?</h1>
          </div>
          <div className="card-container">
                <Card title={"Tecnologia"} description={"Técnicas avançadas da computação podem oferecer um importante auxílio no diagnóstico rápido de doenças como pneumonia, COVID-19, tuberculose e muitas outras. "} imageSrc={require('../../assets/rede-neural.jpg')}/>
                <Card title={"Ferramenta"} description={"Somos uma aplicação para auxiliar médicos a detectar doenças pulmonares a partir de imagens de raio-x usando inteligência artificial."} imageSrc={require('../../assets/umanoide-tHS9j3HWT1s-unsplash.jpg')}/>
                <Card title={"Resultados"} description={"Os resultados dos modelos se equiparam com os da literatura científica."} imageSrc={require('../../assets/national-cancer-institute-NFvdKIhxYlU-unsplash.jpg')}/>
          </div>
        </section>
      
      </main>

    </div>
  </>
  );

};
