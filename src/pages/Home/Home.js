import React from 'react';
import { Video } from '../../components/Video/Video';
import './Home.css'
import { NavbarComp } from '../../components/Header/NavbarComp';
import { Card } from '../../components/Cards/Card';
import { AccordionComp } from '../../components/Accordion/AccordionComp';

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
          <div className="section-title">
            <h1 className="text-white display-6 mb-5 mt-3">Por que contar com a dIAgnostica?</h1>
          </div>
          <div className="card-container">
                <Card title={"Tecnologia"} description={"Técnicas avançadas da computação podem oferecer um importante auxílio no diagnóstico rápido de doenças como pneumonia, COVID-19, tuberculose e muitas outras. "} imageSrc={require('../../assets/rede-neural.jpg')}/>
                <Card title={"Ferramenta"} description={"Somos uma aplicação para auxiliar médicos a detectar doenças pulmonares a partir de imagens de raio-x usando inteligência artificial."} imageSrc={require('../../assets/umanoide-tHS9j3HWT1s-unsplash.jpg')}/>
                <Card title={"Resultados"} description={"Os resultados dos modelos se equiparam com os da literatura científica."} imageSrc={require('../../assets/national-cancer-institute-NFvdKIhxYlU-unsplash.jpg')}/>
          </div>
        </section>
        
        <section>
          <div className="section-title">
            <h1 className="text-white display-6 mb-5 mt-5">Diagósticos</h1>
          </div>
          <div className="accordion-container">

            <AccordionComp title="Pneumonia"
             content="Segundo dados da Organização Mundial da Saúde (OMS), cerca de 2 milhões de crianças abaixo de cinco anos de idade morrem de pneumonia por ano.
              No Brasil, esse índice pode chegar a 11% das mortes em crianças com idade inferior a um ano e 13% na faixa etária de um a quatro anos.
              O aumento dos esforços para combater a pneumonia poderia evitar quase nove milhões de mortes de crianças por pneumonia e outras doenças importantes até 2030."/>

            <AccordionComp  title="Tuberculose"
             content="A tuberculose foi a segunda doença infecciosa que mais matou em 2022.
              Foram cerca de 1,3 milhões de óbitos registrados no período, de acordo com a Organização Mundial da Saúde, OMS." />

            <AccordionComp  title="COVID-19"
             content="No Brasil, a COVID-19 continua sendo um grande desafio. O uso de inteligência artificial para detectar a doença em radiografias é uma opção importante para diagnóstico
              rápido e preciso. A IA pode ajudar os médicos, acelerando a identificação de casos e reduzindo a exposição de profissionais de saúde ao vírus. Isso é especialmente valioso
              durante picos de demanda, tornando o sistema de saúde mais eficiente e eficaz no combate à pandemia." />
          </div>
        </section>

        <footer>
           footer
        </footer>
      
      </main>

    </div>
  </>
  );

};
