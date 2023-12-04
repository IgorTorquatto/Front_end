import React from "react";
import "./Perfil.css";
import { Menu, MenuItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadLogout } from "../../store/ducks/tokens/actions.ts";
import { MdOutlineExitToApp } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { Avatar } from "@chakra-ui/react";

export const Perfil = () => {
  const { data: user } = useSelector((state) => state.tokens);
  const history = useNavigate();
  const dispatch = useDispatch();

  function LoggoutAccount() {
    dispatch(loadLogout());
    history("/");
  }

  function reloadPage() {
    window.location.reload(); // Recarregar a página
  }

  function goBack() {
    history(-1); // Navegar de volta para a página anterior
  }

  return (
    <>
      <div className="perfil-container">
        <div className="perfil-menu">
          <Menu>
            <MenuItem icon={<FaUser />} onClick={reloadPage}>
              Perfil
            </MenuItem>
            <MenuItem icon={<BiArrowBack />} onClick={goBack}>
              Voltar
            </MenuItem>
            <MenuItem icon={<MdOutlineExitToApp />} onClick={LoggoutAccount}>
              Sair
            </MenuItem>
          </Menu>
        </div>

        <div className="perfil-settings">
          <div className="perfil-section">
            <h1>Configurações</h1>
            <div className="perfil-avatar">
              <Avatar
                name={user.data.pessoa.nome}
                src="https://bit.ly/broken-link"
                size="lg"
              />
            </div>
            <div className="perfil-buttons">
              <button className="btn-salvar">Salvar Mudanças</button>
              <button className="btn-cancelar">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
