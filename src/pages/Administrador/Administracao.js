import React, { useState } from "react";
import "./Administracao.css";
import logo from "../../assets/noto_lungs.png";
import { Menu, MenuItem } from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
import { DiagnosticaLogo } from "../../components/Logo/DiagnosticaLogo";
import { GerenciarClinicas } from "../../components/Administracao/GerenciarClinicas";
import { GerenciarModelos } from "../../components/Administracao/GerenciarModelos";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadLogout } from "../../store/ducks/tokens/actions";

export const Administracao = () => {
  const [componenteAtual, setComponenteAtual] = useState("FormDetalhesIA");
  const dispactch = useDispatch();
  const history = useNavigate();

  const renderizarComponente = () => {
    switch (componenteAtual) {
      case "GerenciarClinicas":
        return <GerenciarClinicas />;
      case "GerenciarModelos":
        return <GerenciarModelos />
      default:
        return <GerenciarModelos />;
    }
  };

  return (
    <>
      <div className="administracao-container">
        <div className="administracao-menu">
          <Menu>
            <div className="administracao-logo-section">
              <DiagnosticaLogo className="clinica-logo" />
            </div>
            <hr />
            <div className="administracao-menu-items">
              <MenuItem
                icon={<FaCog />}
                onClick={() => setComponenteAtual("GerenciarModelos")}
              >
                Gerenciar Modelos
              </MenuItem>
              <hr />
              
              <MenuItem
                icon={<FaCog />}
                onClick={() => setComponenteAtual("GerenciarClinicas")}
              >
                Gerenciar Clínicas
              </MenuItem>
              <hr />

              <MenuItem
                icon={<ArrowBackIcon />}
                onClick={() => {
                  dispactch(loadLogout());
                  history('/home'); 
                }}
              >
                Sair
              </MenuItem>
              <hr />
              
            </div>
          </Menu>
        </div>

        <div className="administracao-settings">
          <div className="administracao-header">
            <img src={logo} alt="Logo" />
            <h2>Administração</h2>
          </div>
          <div className="administracao-infos">{renderizarComponente()}</div>
        </div>
      </div>
    </>
  );
};
