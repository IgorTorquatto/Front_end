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
import { DiagnosticaLogo } from "../../components/Logo/DiagnosticaLogo";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api, apiUnAuth } from "../../services/api.ts";
import { loadSession } from "../../store/ducks/tokens/actions.ts";
import { AtualizarDados } from "../../components/Perfil/AtualizarDados";
import { AlterarSenha } from "../../components/Perfil/AlterarSenha";
import { InfosUser } from "../../components/Perfil/InfosUser";

export const Perfil = () => {
  const { data: user } = useSelector((state) => state.tokens);
  const [navigationSection, setNavigationSection] = useState("info");
  const history = useNavigate();
  const dispatch = useDispatch();
  const [showAtualizarDados, setShowAtualizarDados] = useState(false);
  const [showAlterarSenha, setShowAlterarSenha] = useState(false);
  const schema = yup
    .object({
      nome: yup.string().required("Informe seu nome"),
      email: yup
        .string()
        .email("Informe um email valido")
        .required("Informe um email valido"),
      telefone: yup.string().required("Informe um telefone valido"),
      cpf: yup.string().required("Informe um cpf valido"),
      data_nascimento: yup
        .string()
        .required("Informe uma data de nascimento valida"),
      crm: yup.string().required("Informe um crm valido"),
      especialidade: yup.string().required("Informe uma especialidade valida"),
      senha: yup
        .string()
        .min(8, "a senha deve conter 8 caracteres")
        .required("Digite uma senha"),
      confirmarSenha: yup
        .string()
        .required("Digite sua senha novamente")
        .oneOf([yup.ref("senha")], "As senhas devem ser iguais"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (user) => {
    const pessoa = {
      cpf: user.cpf,
      data_nascimento: user.data_nascimento,
      nome: user.nome,
      telefone: user.telefone,
      cargo: "Médico",
    };
    await apiUnAuth
      .post("/pessoa", pessoa)
      .then(({ data }) => {
        const medico = {
          id_pessoa: data.data.id,
          crm: user.crm,
          especialidade: user.especialidade,
          senha: user.senha,
          email: user.email,
        };

        apiUnAuth
          .post("/medico", medico)
          .then(({ data }) => {
            const login = {
              email: user.email,
              senha: user.senha,
            };
            dispatch(loadSession(login));
            history("/sobre");
          })
          .catch(({}) => {});
      })
      .catch(({ error }) => {
        // alert("Error ao cadastrar")
      });
  };

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

  const attData = () => {
    setNavigationSection("updateData");
    setShowAtualizarDados(true);
    setShowAlterarSenha(false);
  };

  const alterarSenha = () => {
    setNavigationSection("changePassword");
    setShowAtualizarDados(false);
    setShowAlterarSenha(true);
  };

  const handleAvatarClick = () => {
    setNavigationSection("info"); // Define a seção de navegação de volta para as informações iniciais
    setShowAtualizarDados(false); // Esconde as seções de atualização de dados e alteração de senha
    setShowAlterarSenha(false);
  };

  return (
    <>
      <div className="perfil-container">
        <div className="perfil-menu">
          <Menu>
          <div className="perfil-logo-section">
            <DiagnosticaLogo className="perfil-logo" />
          </div>
          <hr></hr>
          <div className="perfil-avatar" onClick={handleAvatarClick}>
              <Avatar
                className="perfil-avatar-custom"
                name={user.data.pessoa.nome}
                src="https://bit.ly/broken-link"
                size="lg"
              />
              <span>{user.data.pessoa.nome}</span>
            </div>
            <div className="perfil-menu-items">
              <hr></hr>
              <MenuItem icon={<FaKey />} onClick={alterarSenha}>
                Alterar Senha
              </MenuItem>
              <hr></hr>
              <MenuItem icon={<FaSyncAlt />} onClick={attData}>
                Atualizar Dados
              </MenuItem>
              <hr></hr>
              <MenuItem icon={<BiArrowBack />} onClick={goBack}>
                Voltar
              </MenuItem>
              <hr></hr>
              <MenuItem icon={<MdOutlineExitToApp />} onClick={LoggoutAccount}>
                Sair da conta
              </MenuItem>
              <hr></hr>
            </div>
          </Menu>
        </div>

        <div className="perfil-settings">
          {navigationSection === "info" && (
            <div className="infosuser">
              <InfosUser />
            </div>
          )}
          {showAtualizarDados && <AtualizarDados />}
          {showAlterarSenha && <AlterarSenha />}
        </div>
      </div>
    </>
  );
};
