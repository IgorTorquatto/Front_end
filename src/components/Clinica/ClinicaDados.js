import React, { useEffect } from "react";
import "./ClinicaDados.css";
import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaMap,
  FaMapMarked,
  FaIdCard,
  FaCog,
  FaTrashAlt,
  FaSave,
} from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { Box, Divider, Button, Spinner, Flex, Text, useDisclosure, Modal, ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast, } from "@chakra-ui/react";

import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { ClinicaAlterarDados } from "./ClinicaAlterarDados";
import { ClinicaGerenciarFuncionarios } from "./ClinicaGerenciarFuncionarios";
import { cep_mask, telefone_mask, cnpj_mask } from "../Forms/form-masks";

export const ClinicaDados = () => {
  const { data: user } = useSelector((state) => state.tokens);
  const [funcionarios, setFuncionarios]  = useState([])
  const [loading, setLoading]  = useState(true)
  const [gerenciando, setGerenciando] = useState(false)
  const [Confirmacao, setConfirmacao] = useState('')
  const [funcionarParaRemover, setFuncionarioParaRemover] = useState(null)
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

   const loadFuncionarios = async ()=>{
    await api.get(`/clinica/${user.data.id}/medico`).then(({data})=>{
      setFuncionarios(data.data.sort((a, b) => {
        return a.pessoa.nome.localeCompare(b.pessoa.nome);
      }))
      setLoading(false)
    }).catch((data)=>{
      console.log(data)
    })
  }
  
  useEffect(()=>{
    loadFuncionarios()
  },[])
  

  const [isEditing, setIsEditing] = useState(false); 
  const [isManaging, setIsManaging] = useState(false);

  const excluirFuncionario = async () => {
    await api.delete(`/medico/${funcionarParaRemover.id}`)
  }

  const removeMedico = async () => {
    excluirFuncionario().then(() => {
      loadFuncionarios()
      toast({
        title: 'Funcionário excluido',
        status: 'success',
        duration: 3000
      })
    }).catch(() => {
      toast({
        title: 'Funcionário não excluido',
        status: 'error',
        duration: 3000
      })
    })
    onClose();
  }

  const voltarParaClinicaDados = () => {
    setIsEditing(false); // Define o estado para false, voltando à renderização de ClinicaDados
  };

  const voltarParaClinicaDados2 = () => {
    setIsManaging(false); // Define o estado para false, voltando à renderização de ClinicaDados
  };

  function handleEditClick() {
    setIsEditing(true); // Quando o botão de editar for clicado, definir o estado para true
  }

  function handleGerenciarClick() {
    setIsManaging(true); // Quando o botão de gerenciar for clicado, definir o estado para true
  }


  const handleModal = (funcionarioSelecionado) => {
    setFuncionarioParaRemover(funcionarioSelecionado)
    onOpen()
  }

  return (
    <>
     {isEditing ? ( // Se estiver em modo de edição, renderize o componente ClinicaAlterarDados
        <ClinicaAlterarDados voltarParaClinicaDados={voltarParaClinicaDados}/>
      ) : isManaging ? ( // Se estiver gerenciando funcionários, renderize o componente ClinicaGerenciarFuncionarios
        <ClinicaGerenciarFuncionarios voltarParaClinicaDados2={voltarParaClinicaDados2}/>
      ) : (
    <div className="clinicaDados-container">
      <div className="clinicaDados-section-top">
        <h2>Dados da Clínica</h2>
        <div className="clinicaDados-details">
          <div className="column">
            <div>
              <FaBuilding />
              <strong>Nome:</strong>
              <span>{user.data.nome}</span>
            </div>
            <div>
              <FaEnvelope />
              <strong>E-mail:</strong>
              <span>{user.data.email}</span>
            </div>
            <div>
              <FaPhone />
              <strong>Telefone:</strong>
              <span>{telefone_mask(user.data.telefone)}</span>
            </div>
          </div>
          <div className="column">
            <div>
              <FaIdCard />
              <strong>CNPJ:</strong>
              <span>{cnpj_mask(user.data.cnpj)}</span>
            </div>
            <div>
              <FaMapMarked />
              <strong>CEP:</strong>
              <span>{cep_mask(user.data.cep)}</span>
            </div>
            <div>
              <FaMap />
              <strong>Logradouro:</strong>
              <span>{user.data.logradouro}</span>
            </div>
          </div>
        </div>
        <div className="btn-clinica-editar">
          <Button leftIcon={<CiEdit />} colorScheme="blue" bgColor={'#0d6efd'} onClick={handleEditClick}> Editar</Button>
        </div>
      </div>

      <Divider />

      <Box flex={1} alignItems={'center'} display={'flex'} flexDirection={'column'}>

        <Box w={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} mb={'15px'}>
          <h2>Médicos Associados</h2>
        </Box>

        <Box w={'91%'} height={'42vh'} className="table-wrapper" maxHeight={'42vh'} px='0.5%'>
        {loading ? <Flex w='100%' justifyContent='center' alignItems='center' height='100%'>
                <Spinner emptyColor='gray.200' thickness='5px' color='#3b83c3' size='xl'/>
              </Flex>  :
              funcionarios.length < 1 ? <Text textAlign='center'>Nenhum médico cadastrado</Text> :
          <table className="table table-striped table-hover custom-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Especialidade</th>
                <th scope="col">E-mail</th>
                <th scope="col">CRM</th>
                {gerenciando ? <th scope="col">Remover</th> : null}
              </tr>
            </thead>
            <tbody id="clinica-medicos-tbody">
              
              {funcionarios.map((funcionario, index) => (
                <tr key={index}>
                  <th style={{verticalAlign: "middle"}} scope="row">{index+1}</th>
                  <td style={{verticalAlign: "middle"}}>{funcionario.pessoa.nome}</td>
                  <td style={{verticalAlign: "middle"}}>{funcionario.especialidade}</td>
                  <td style={{verticalAlign: "middle"}}>{funcionario.email}</td>
                  <td style={{verticalAlign: "middle"}}>{funcionario.crm}</td>
                  {gerenciando ? <td><Button bgColor={"white"} onClick={() => handleModal(funcionario)}><FaTrashAlt color="red" /></Button></td> : null}
                </tr>
              ))}
              </tbody>
          </table>
        }
        </Box>

      </Box>
      <div className="btn-clinica-gerenciar">
        {
          gerenciando ? <Button leftIcon={<FaSave />} colorScheme="green" onClick={() => {
            setGerenciando(false)
          }}>Salvar</Button>
            :
            <Button leftIcon={<FaCog />} colorScheme="blue" bgColor={'#0d6efd'} onClick={() => setGerenciando(true)}> Gerenciar</Button>
        }
      </div>
    </div>
    )}

  <Modal isOpen={isOpen} 
    onClose={() => {setConfirmacao("")
    onClose() }} size='6xl'>
  <ModalOverlay />

    <ModalContent w='50%' bgColor={'#eef1f3'} p={15} alignSelf={'center'}>

      <ModalHeader textAlign={"center"}>Confirmação</ModalHeader>
      <ModalCloseButton />
      <ModalBody w='100%'>
        <Box>
          <Text>Para confirmar a desassociação do médico, digite  "<b>{funcionarParaRemover?.crm.slice(0, 3)}</b>" e clique em "<b>Remover</b>"</Text>
          <Input 
            bgColor={'white'} 
            onChange={(e) => { setConfirmacao(e.target.value) }}
          />
        </Box>
        <Box display={'flex'} justifyContent={"flex-end"} w={'100%'} mt={10}>
          <Button colorScheme='blackAlpha' mx={5} onClick={() => {onClose(); setConfirmacao("")}}>Cancelar</Button>
          <Button 
            colorScheme="red" 
            onClick={removeMedico}
            isDisabled={Confirmacao !== funcionarParaRemover?.crm.slice(0, 3)}
            >Remover</Button>  
        </Box>
      </ModalBody>
    </ModalContent>
  </Modal>
  </>
  );
};
