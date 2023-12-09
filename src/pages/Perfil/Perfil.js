import React from "react";
import "./Perfil.css";
import { Menu, MenuItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadLogout } from "../../store/ducks/tokens/actions.ts";
import { MdOutlineExitToApp } from "react-icons/md";
import { FaUser, FaKey, FaSyncAlt } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { Avatar } from "@chakra-ui/react";
import { useState } from "react";
import logo from "../../assets/noto_lungs.png";
import { DiagnosticaLogo } from "../../components/Logo/DiagnosticaLogo";

export const Perfil = () => {
  const { data: user } = useSelector((state) => state.tokens);
  const history = useNavigate();
  const dispatch = useDispatch();

  function LoggoutAccount() {
    const confirmLogout = window.confirm(
      "Você realmente quer se desconectar do site?"
    );

    if (confirmLogout) {
      dispatch(loadLogout());
      history("/");
    } else {
      window.location.reload();
    }
  }

  function goBack() {
    history(-1); // Navegar de volta para a página anterior
  }

  return (
    <>
      <div className="perfil-container">
        <div className="perfil-menu">
          <Menu>
            <div className="perfil-avatar">
              <Avatar
                className="perfil-avatar-custom"
                name={user.data.pessoa.nome}
                src="https://bit.ly/broken-link"
                size="lg"
              />
              <span>{user.data.pessoa.nome}</span>
            </div>
            <div className="perfil-menu-items">
              <MenuItem icon={<FaKey />}>Alterar Senha</MenuItem>
              <MenuItem icon={<FaSyncAlt />}>Atualizar Dados</MenuItem>
              <MenuItem icon={<BiArrowBack />} onClick={goBack}>
                Voltar
              </MenuItem>
              <MenuItem icon={<MdOutlineExitToApp />} onClick={LoggoutAccount}>
                Sair da conta
              </MenuItem>
            </div>
          </Menu>
          <div className="perfil-logo-section">
            <DiagnosticaLogo className="perfil-logo" />
          </div>
        </div>

        <div className="perfil-settings">
          <div className="perfil-settings-title">
            <h1>Informações do perfil</h1>
          </div>
        </div>
      </div>
    </>
  );
};
