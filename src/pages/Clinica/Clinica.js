import React, { useState } from "react";
import "./Clinica.css";
import { Menu, MenuItem } from "@chakra-ui/react";
import { MdOutlineExitToApp } from "react-icons/md";
import { FaKey, FaUserMd, FaChartBar, FaRobot } from "react-icons/fa";
import { Avatar } from "@chakra-ui/react";
import { DiagnosticaLogo } from "../../components/Logo/DiagnosticaLogo";
import { useNavigate } from "react-router-dom";
import { ClinicaDados } from "../../components/Clinica/ClinicaDados";
import { ClinicaAlterarSenha } from "../../components/Clinica/ClinicaAlterarSenha";
import { CadastrarMedico } from "../../components/Clinica/CadastrarMedico";
import { Estatisticas } from "../../components/Clinica/Estatisticas";
import { GerenciarIA } from "../../components/Clinica/GerenciarIA";
import { useDispatch, useSelector } from 'react-redux';

export const Clinica = () => {
  //Variables
  const history = useNavigate();
  const { data: user } = useSelector((state) => state.tokens);

  console.log(user)
  const [componenteExibido, setComponenteExibido] = useState(<ClinicaDados />); // Define o componente exibido por padrão

  //Functions
  function handleClick(item) {
    switch (item) {
      case "Alterar Senha":
        setComponenteExibido(<ClinicaAlterarSenha />);
        break;
      case "Cadastrar médico":
        setComponenteExibido(<CadastrarMedico />);
        break;
      case "Estatísticas":
        setComponenteExibido(<Estatisticas />);
        break;
      case "Gerenciar IA":
        setComponenteExibido(<GerenciarIA />);
        break;
      default:
        setComponenteExibido(<ClinicaDados />);
        break;
    }
  }

  function handleAvatarClick() {
    setComponenteExibido(<ClinicaDados />);
  }

  function handleCancelar() {
    setComponenteExibido(<ClinicaDados />);
  }

  function goBack() {
    const confirmBack = window.confirm("Você realmente quer sair da página?");
    if (confirmBack) {
      // Redirecionar para a página Home.js 
      history('/home'); 
    }
  }

  function voltarParaClinicaDados() {
    setComponenteExibido(<ClinicaDados/>);
  }


  return (
    <>
      <div className="clinica-container">
        <div className="clinica-menu">
          <Menu>
            <div className="clinica-logo-section">
              <DiagnosticaLogo className="clinica-logo" />
            </div>
            <hr />
            <div className="clinica-avatar" onClick={handleAvatarClick}>
              <Avatar
                className="clinica-avatar-custom"
                src="https://bit.ly/broken-link"
                size="lg"
                marginBottom={'10px'}
              />
              <span>Nome da Clínica</span>
            </div>
            <div className="clinica-menu-items">
              <hr />
              <MenuItem
                icon={<FaKey />}
                onClick={() => handleClick("Alterar Senha")}
              >
                Alterar Senha
              </MenuItem>
              <hr />
              <MenuItem
                icon={<FaUserMd />}
                onClick={() => handleClick("Cadastrar médico")}
              >
                Cadastrar médico
              </MenuItem>
              <hr />
              <MenuItem
                icon={<FaChartBar />}
                onClick={() => handleClick("Estatísticas")}
              >
                Estatísticas
              </MenuItem>
              <hr />
              <MenuItem
                icon={<FaRobot />}
                onClick={() => handleClick("Gerenciar IA")}
              >
                Gerenciar IA
              </MenuItem>
              <hr />
              <MenuItem icon={<MdOutlineExitToApp />} onClick={goBack}>
                Sair
              </MenuItem>
            </div>
          </Menu>
        </div>

        <div className="clinica-settings">
        <div className="clinicaDados">{React.cloneElement(componenteExibido, { voltarParaClinicaDados, handleCancelar })}</div>
        </div>
      </div>
    </>
  );
};
