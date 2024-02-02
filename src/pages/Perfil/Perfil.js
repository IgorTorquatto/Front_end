import React from "react";
import "./Perfil.css";
import {
  Menu,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  AvatarBadge,
  Text,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, loadLogout } from "../../store/ducks/tokens/actions.ts";
import { MdOutlineExitToApp } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { Avatar } from "@chakra-ui/react";
import { useState } from "react";
import { DiagnosticaLogo } from "../../components/Logo/DiagnosticaLogo";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api, apiUnAuth } from "../../services/api.ts";
import { loadSession } from "../../store/ducks/tokens/actions.ts";
import { AtualizarDados } from "../../components/Perfil/AtualizarDados";
import { AlterarSenha } from "../../components/Perfil/AlterarSenha";
import { InfosUser } from "../../components/Perfil/InfosUser";
import { MdEdit } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

export const Perfil = () => {

  const { data: user } = useSelector((state) => state.tokens);
  const dispactch = useDispatch();
  const [navigationSection, setNavigationSection] = useState("info");
  const [editAvatarClassname, setEditAvatarClassname] = useState("editAvatarOff");
  const history = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showAtualizarDados, setShowAtualizarDados] = useState(false);
  const [showAlterarSenha, setShowAlterarSenha] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageData, setUploadedImageData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  function goBackHome() {
    const confirmBack = window.confirm("Você realmente quer sair da página?");
    if (confirmBack) {
      dispactch(loadLogout());
      // Redirecionar para a página Home.js 
      history('/home'); 
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

  const handleEditData = () => {
    attData();
  };

  const handleAtualizarDadosCancel = () => {
    setShowAtualizarDados(false); // Esconder o componente AtualizarDados
    setNavigationSection("info"); // Mudar para a seção 'info' para renderizar InfosUser
  };

  const handleAlterarSenhaCancel = () => {
    setShowAlterarSenha(false); // Esconder o componente AlterarSenha
    setNavigationSection("info"); // Mudar para a seção 'info' para renderizar InfosUser
  };

  async function submitLaudo() {
    const medico = {
      foto_perfil: uploadedImage,
    };
    setIsLoading(true);
    await toast.promise(
      api.put(`/medico/${user.data.id}`, medico)
        .then(({ data }) => {
          onClose();
          dispatch(editProfile(data.data));
          setIsLoading(false);
        })
        .catch(({ err }) => {
          console.log(err);
          throw err;
        }),
      {
        loading: { title: 'Atualização em andamento.', description: 'Por favor, aguarde.' },
        success: { title: 'A Foto do seu perfil foi atualizada!', duration: 6000, isClosable: true},
        error: { title: 'Erro ao atualizar sua foto do perfil.', description: 'Por favor, tente novamente.', duration: 6000, isClosable: true},  
      });
  }

  const handleContainerClick = () => {
    document.getElementById("file-input").click();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    setUploadedImageData(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedImageData(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Cria uma nova imagem
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          // Cria um canvas
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;

          // Desenha a imagem no canvas
          context.drawImage(img, 0, 0, img.width, img.height);

          // Converte o conteúdo do canvas para JPEG
          const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.9);

          // Atualiza o estado com a imagem JPEG
          setUploadedImage(jpegDataUrl);
        };
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Foto de Perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              mt="2rem"
              textAlign="center"
              border={isDragging ? "2px solid #4CAF50" : "2px dashed #ccc"}
              borderRadius="50%"
              padding="20px"
              cursor="pointer"
              marginBottom="20px"
              onClick={handleContainerClick}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              w="100%"
              height="50vh"
              display="flex"
              alignItems="center"
              justifyContent="center"
              background="#F8F8F9"
            >
              {!uploadedImage && (
                <Box lineHeight="0.5rem">
                  <p id="titleDragInput">Clique para fazer o upload </p>
                  <p id="titleDragInput">ou arraste sua imagem</p>
                </Box>
              )}
              <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  style={{ maxWidth: "100%", maxHeight: "300px" }}
                />
              )}
            </Box>

            <Button onClick={() => submitLaudo()} colorScheme="blue" mb="1rem">
              Editar Imagem de perfil
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
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
                src={user.data.foto_perfil}
                size="lg"
              >
                <AvatarBadge
                  background="white"
                  className={editAvatarClassname}
                  onClick={onOpen}
                  onMouseEnter={() => setEditAvatarClassname("editAvatarOn")}
                  onMouseLeave={() => setEditAvatarClassname("editAvatarOff")}
                  boxSize="1.25em"
                >
                  {/* <EditIcon  /> */}
                  <MdEdit color="#0b2a45" />{" "}
                  {editAvatarClassname === "editAvatarOn" && (
                    <Text
                      padding="0 1rem"
                      mt="1rem"
                      color="#0b2a45"
                      fontSize="0.85rem"
                    >
                      Editar
                    </Text>
                  )}
                </AvatarBadge>
              </Avatar>
              <span>{user.data.pessoa.nome}</span>
            </div>
            <div className="perfil-menu-items">
              <hr></hr>
              <MenuItem icon={<FaKey />} onClick={alterarSenha}>
                Alterar Senha
              </MenuItem>
              <hr></hr>
              <MenuItem icon={<BiArrowBack />} onClick={goBack}>
                Voltar
              </MenuItem>
              <hr></hr>
              <MenuItem icon={<MdOutlineExitToApp />} onClick={goBackHome}>
                Sair 
              </MenuItem>
            </div>
          </Menu>
        </div>

        <div className="perfil-settings">
          {navigationSection === "info" && (
            <div className="infosuser">
              <InfosUser />
              <div className="btn-editar-dados">
                <Button leftIcon={<CiEdit />} onClick={handleEditData} colorScheme="blue" bgColor={'#007bff'}> Editar Dados</Button>
              </div>
            </div>
          )}
          {showAtualizarDados && (
            <AtualizarDados onCancel={handleAtualizarDadosCancel} />
          )}
          {showAlterarSenha && (
            <AlterarSenha onCancel={handleAlterarSenhaCancel} />
          )}
        </div>
      </div>
    </>
  );
};
