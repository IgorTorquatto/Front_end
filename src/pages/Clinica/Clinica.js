import React, { useState } from "react";
import "./Clinica.css";
import { Menu, MenuItem } from "@chakra-ui/react";
import { MdOutlineExitToApp } from "react-icons/md";
import { FaKey, FaUserMd, FaChartBar, FaRobot } from "react-icons/fa";
import { Avatar } from "@chakra-ui/react";
import { DiagnosticaLogo } from "../../components/Logo/DiagnosticaLogo";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { useHistorico } from "../../hooks/useHistorico";

export const Clinica = () => {
  //Variables
  const history = useNavigate();
  const { data: user } = useSelector((state) => state.tokens);
  const {historico, handleHistorico } = useHistorico()
  console.log(historico)

  console.log(user)

  function goBack() {
    const confirmBack = window.confirm("Você realmente quer sair da página?");
    if (confirmBack) {
      history(-1); 
    }
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
            <div className="clinica-avatar" onClick={()=>handleHistorico(null)}>
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
                onClick={() => handleHistorico("Alterar Senha")}
              >
                Alterar Senha
              </MenuItem>
              <hr />
              <MenuItem
                icon={<FaUserMd />}
                onClick={() => handleHistorico("Cadastrar médico")}
              >
                Cadastrar médico
              </MenuItem>
              <hr />
              <MenuItem
                icon={<FaChartBar />}
                onClick={() => handleHistorico("Estatísticas")}
              >
                Estatísticas
              </MenuItem>
              <hr />
              <MenuItem
                icon={<FaRobot />}
                onClick={() => handleHistorico("Gerenciar IA")}
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
          <div className="clinicaDados">{historico}</div>
        </div>
      </div>
    </>
  );
};
