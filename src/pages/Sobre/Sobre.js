import React from "react";
import "./Sobre.css";
import { NavbarComp } from "../../components/Header/NavbarComp";
import { MyFooter } from "../../components/Footer/Footer";

export const Sobre = () => {
  return (
    <>
      <div className="sobre-container">
        <header>
          <nav>
            <NavbarComp showEntrarButton={true} />
          </nav>
        </header>

        <main>
          <div className="sobre-imagem">
            <div className="sobre-imagem-texto">Sobre nós</div>
          </div>

          <section className="d-flex sobre-secao1">
            <div className="secao1-retangulo"></div>
            <div className="secao1-container-h1">
              <h1 className="secao1-h1">
                Somos a dIAgnostica e acreditamos que a tecnologia deve ser
                usada para o bem da humanidade.
              </h1>
            </div>
          </section>

          <div className="sobre-secoes">
            <section className="sobre-secao2">
              <div className="secao2-texto">
                <p>
                  A criação da dIAgnostica marca um notável marco na interseção
                  entre a academia e a indústria tecnológica, resultando de uma
                  colaboração conjunta de estudantes da Universidade Federal do
                  Cariri. Este projeto visionário ganhou vida graças ao apoio da
                  BRISA - Sociedade para o Desenvolvimento da Tecnologia da
                  Informação, em parceria com a SOFTEX, e foi financiado pelo
                  Ministério de Ciência, Tecnologia e Inovação (MCTIC) através
                  dos recursos provenientes da Lei nº 8.248/91. A DiAgnostica
                  nasceu com um propósito claro: utilizar a inteligência
                  artificial como uma ferramenta poderosa para melhorar o
                  diagnóstico de doenças pulmonares. Com a aplicação de
                  tecnologia de ponta e algoritmos avançados, essa inovação visa
                  revolucionar o campo da medicina, tornando os diagnósticos
                  mais precisos, rápidos e acessíveis. Esse esforço colaborativo
                  exemplifica o potencial transformador da cooperação entre
                  instituições acadêmicas, empresas de tecnologia e entidades
                  governamentais. Nossa missão é auxiliar os médicos a salvarem
                  vidas através da aplicação da inteligência artificial na
                  detecção precoce e precisa de doenças pulmonares e criar um
                  mundo onde essas doenças possam ser diagnosticadas e tratadas
                  com rapidez, melhorando a qualidade de vida de milhões de
                  pessoas.
                </p>

                <h3>Equipe dIAgnostica:</h3>
                <ul>
                  <li>Carlos Eduardo</li>
                  <li>Victor</li>
                  <li>Diego</li>
                  <li>Raphael</li>
                  <li>Cicero Igor</li>
                </ul>
              </div>
            </section>

            <section className="sobre-secao3">
              <a href="https://www.ufca.edu.br/" target="_blank">
                {" "}
                <img
                  src={require("../../assets/federal-do-cariri.webp")}
                  alt="universidade federal do cariri"
                ></img>
              </a>
            </section>
          </div>
        </main>

        <footer>
          <MyFooter />
        </footer>
      </div>
    </>
  );
};
