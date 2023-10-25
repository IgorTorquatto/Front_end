import React from 'react';
import { VideoComp } from '../../components/VideoComp/VideoComp';
import './Home.css'
import { NavbarComp } from '../../components/Header/NavbarComp';
import { CardComp } from '../../components/Cards/CardComp';

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
              <VideoComp />
              <br></br>
            </div>
        </section>

        <section>
          <div className="section1-title">
            <h1 className="text-white display-6 mb-5 mt-3">Por que contar com a dIAgnostica?</h1>
          </div>
          <div className="card-container">
                <CardComp title={"Card 1"} description={"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups"} imageSrc={require('../../assets/national-cancer-institute-NFvdKIhxYlU-unsplash.jpg')}/>
                <CardComp title={"Card 2"} description={"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups"} imageSrc={require('../../assets/umanoide-tHS9j3HWT1s-unsplash.jpg')}/>
                <CardComp title={"Card 3"} description={"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups"} imageSrc={require('../../assets/umanoide-tHS9j3HWT1s-unsplash.jpg')}/>
          </div>
        </section>
      
      </main>

    </div>
  </>
  );

};
