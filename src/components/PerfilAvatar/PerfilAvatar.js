import React from "react";
import "./PerfilAvatar.css";
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../store/ducks/tokens/actions";

import { Avatar } from "@chakra-ui/react";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api, apiUnAuth } from "../../services/api";
import { loadSession } from "../../store/ducks/tokens/actions";
import { MdEdit } from "react-icons/md";


export const PerfilAvatar = (userType) => {

  const [editAvatarClassname, setEditAvatarClassname] =
    useState("editAvatarOff");
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.tokens);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageDat, setUploadedImageData] = useState(false);

  async function submitLaudo() {
    const userAvatar = {
      foto_perfil: uploadedImage,
    };
    setIsLoading(true);
    const url = userType === 'medico' ? 'medico': 'clinica'
    await api
      .put(`/${url}/${user.data.id}`, userAvatar)
      .then(({ data }) => {
        onClose();
        dispatch(editProfile(data.data));
        setIsLoading(false);
      })
      .catch(({ err }) => {
        console.log(err);
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
      <Avatar
                className="perfil-avatar-custom"
                name={ userType === 'medico' ? user.data.pessoa.nome : user.data.nome}
                src={user.data.foto_perfil}
                size="2xl"
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
    </>
  );
};
