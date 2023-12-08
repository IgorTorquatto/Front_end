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
import  logo  from "../../assets/noto_lungs.png";
import { DiagnosticaLogo } from "../../components/Logo/DiagnosticaLogo";

export const Perfil = () => {
  const { data: user } = useSelector((state) => state.tokens);
  const history = useNavigate();
  const dispatch = useDispatch();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showUpdateData, setShowUpdateData] = useState(false);

  function LoggoutAccount() {
    const confirmLogout = window.confirm("Você realmente quer se desconectar do site?");
  
    if (confirmLogout) {
      dispatch(loadLogout());
      history("/");
    } else {
      window.location.reload();
    }
  }
  

  function reloadPage() {
    window.location.reload(); // Recarregar a página
  }

  function goBack() {
    history(-1); // Navegar de volta para a página anterior
  }

  function changePassword() {
    setShowChangePassword(true);
    setShowUpdateData(false); // Esconde o formulário de atualização de dados, se estiver visível
  }

  function updateData() {
    setShowUpdateData(true);
    setShowChangePassword(false); // Esconde o formulário de alterar senha, se estiver visível
  }

  function cancelChangePassword() {
    setShowChangePassword(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Lógica para salvar a nova senha
    setShowChangePassword(false); // Oculta o formulário após salvar a senha
  }

  // Lógica para atualizar dados
  function handleUpdate(event) {
    event.preventDefault();
    // Lógica para atualizar dados
    setShowUpdateData(false); // Oculta o formulário após atualizar os dados
  }

  return (
    <>
      <div className="perfil-container">
        <div className="perfil-menu">
          <Menu>
            <div style={{float:'left', marginLeft:'10px', marginTop:'10px', marginBottom:'30px'}}>            
              <DiagnosticaLogo/>
            </div>
            <MenuItem icon={<FaUser />} onClick={reloadPage}>
              Perfil
            </MenuItem>
            <MenuItem icon={<FaKey />} onClick={changePassword}>
              Alterar Senha
            </MenuItem>
            <MenuItem icon={<FaSyncAlt />} onClick={updateData}>
              Atualizar Dados
            </MenuItem>
            <MenuItem icon={<BiArrowBack />} onClick={goBack}>
              Voltar
            </MenuItem>
            <MenuItem icon={<MdOutlineExitToApp />} onClick={LoggoutAccount}>
              Sair da conta
            </MenuItem>
          </Menu>
        </div>

        <div className="perfil-settings">
          <div className="perfil-section">
            <h1>Configurações</h1>
            {showChangePassword && (
              <form onSubmit={handleSubmit} className="perfil-password-form">
                {/* Formulário de alteração de senha */}
                <label htmlFor="currentPassword">Senha Atual:</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                />

                <label htmlFor="newPassword">Nova Senha:</label>
                <input type="password" id="newPassword" name="newPassword" />

                <label htmlFor="confirmNewPassword">
                  Confirmar Nova Senha:
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                />

                {/*Botões*/}
                <div className="perfil-buttons">
                  <button type="submit" className="btn-salvar">
                    Salvar Mudanças
                  </button>
                  <button
                    type="button"
                    className="btn-cancelar"
                    onClick={cancelChangePassword}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {showUpdateData && (
              <form onSubmit={handleUpdate} className="perfil-update-form">
                {/* ...seu formulário de atualização de dados */}
                {/*Botões*/}
                <div className="perfil-buttons">
                  <button type="submit" className="btn-salvar">
                    Salvar Mudanças
                  </button>
                  <button
                    type="button"
                    className="btn-cancelar"
                    onClick={cancelChangePassword}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {!showChangePassword && !showUpdateData && (
              <div className="perfil-initial">
                <div className="perfil-avatar">
                  <Avatar
                    name={user.data.pessoa.nome}
                    src="https://bit.ly/broken-link"
                    size="lg"
                  />
                </div>
                <p>
                  {" "}
                  Olá, {user.data.pessoa.nome} você está na seção de
                  configurações do seu perfil.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
