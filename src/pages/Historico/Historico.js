import React, { useState, useEffect } from 'react'
import { NavbarComp } from '../../components/Header/NavbarComp'
import { Box } from '@chakra-ui/react'
import { MyFooter } from '../../components/Footer/Footer'
import { HistoricoCard } from '../../components/Cards/HistoricoCard'
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../services/api.ts'
import {
  Input, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Container
} from '@chakra-ui/react'

import './Historico.css'

export const Historico = () => {
  const { data: user } = useSelector((state) => state.tokens);

  const [diagnosticosArray, setDiagnosticosArray] = useState([]);
  const [diagnosticosOnDisplay, setDiagnosticosOnDisplay] = useState([]);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [diagnostico, setDiagnostico] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure()

  async function loadHistorico() {
    await api.get(`/diagnostico?id_medico=${user.data.id}`).then(({ data }) => {
      setDiagnosticos(data)
      console.log(data)

    }).catch(({ err }) => {
      console.log(err)
    })
  }

  const searchOnHistory = (search) => {

    var diagnosticos = diagnosticosArray.filter(item => {
      var nome = item.nomePaciente.toLowerCase(), cpf = item.cpf.toLowerCase(), exameID = item.exameID.toLowerCase();
      var searched = search.target.value.toLowerCase()
      return nome.includes(searched) || cpf.includes(searched) || exameID.includes(searched)
    })
    setDiagnosticosOnDisplay(diagnosticos)
  }

  const handleModal = (diagnosticoSelecionado)=>{
    setDiagnostico(diagnosticoSelecionado)
    onOpen()
  }

  useEffect(() => {
    loadHistorico()
  }, [])

  return (
    <Box className='historico-container'>
      <Box>
        <NavbarComp showEntrarButton={true} />
      </Box>
      <Box id='historico-body'>
        <Box id='main-content'>
          <Box id='hist-searchbar-context'>
            <Box>

            </Box>
            <Input placeholder='Busque Por: Nome, CPF ou Número do Exame' mr='0.5rem' onChange={searchOnHistory} backgroundColor={'white'} />
            {/*
              <Box className='search-icon' cursor={'pointer'} onClick={() => window.alert("Botão de buscar clicado")}>
                <LuSearch className='icone-lupa' />
                <span className='search-text'>Buscar</span>
              </Box>  
              */}
          </Box>
          <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
            <ModalContent>
              <ModalHeader>Informações do Paciente</ModalHeader>
                <ModalCloseButton />
                  <ModalBody>
                    <Container display='flex'>
                    <Box>
                    <Text>Name: {diagnostico?.paciente.pessoa.nome}</Text>
                    <Text>CPF: {diagnostico?.paciente.pessoa.cpf}</Text>
                    <Text>Telefone: {diagnostico?.paciente.telefone}</Text>
                    <Text>Rua: {diagnostico?.paciente.logradouro}</Text>
                    <Text>Bairro: {diagnostico?.paciente.bairro}</Text>
                    <Text>Número: {diagnostico?.paciente.numero}</Text>
                    <Text>Cidade: {diagnostico?.paciente.cidade}</Text>
                    </Box>
                    </Container>
                  
                  </ModalBody>
            </ModalContent>
        </Modal>
          <Box id='result-context'>
            {
              diagnosticos.map((user, index) => {
                return (
                  <Box className='historico-line' onClick={()=>handleModal(user)} key={index}>
                    <HistoricoCard data={user} />
                  </Box>
                );
              })
            }
          </Box>
        </Box>
      </Box>
      <Box>
        <MyFooter />
      </Box>
    </Box>
  )
}
