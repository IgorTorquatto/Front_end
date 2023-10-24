import React from 'react';
import { LandComp } from '../../components/LandComp/LandComp';
import './Home.css'
import { NavbarComp } from '../../components/Header/NavbarComp';
import { CardComp } from '../../components/Cards/CardComp';

export const Home = () => {

  return (
    <>
    <div className="home-container">

      <div className="home-navbar">
        <header>
          <nav><NavbarComp customClass="navbar-transparent" showEntrarButton={false} /></nav>
        </header>
      </div>

      <main>

        <section>
           <div className="home-landcomp">
              <div className="custom-title">
                <h1 className="font-weight-bold">ferramenta médica para análises de raio-x</h1>
              </div>
              <LandComp />
            </div>
        </section>

        <section>
            <div className="card-container">
                <CardComp title={"Card 1"} description={"Lorem"} imageSrc={require('../../assets/umanoide-tHS9j3HWT1s-unsplash.jpg')}/>
                <CardComp title={"Card 2"} description={"Lorem"} imageSrc={require('../../assets/umanoide-tHS9j3HWT1s-unsplash.jpg')}/>
                <CardComp title={"Card 3"} description={"Lorem"} imageSrc={require('../../assets/umanoide-tHS9j3HWT1s-unsplash.jpg')}/>
            </div>
        </section>

      </main>

    </div>
  </>
  );

};
