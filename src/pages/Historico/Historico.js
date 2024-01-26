import React, { useState, useEffect } from 'react'
import { NavbarComp } from '../../components/Header/NavbarComp'
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
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Divider,
  AbsoluteCenter,
  Spinner,
  Flex,
  Box,
  Select,
} from '@chakra-ui/react'
import { GiSettingsKnobs } from "react-icons/gi";

import './Historico.css'
import dayjs from 'dayjs';

export const Historico = () => {
  const { data: user } = useSelector((state) => state.tokens);

  const [diagnosticosArray, setDiagnosticosArray] = useState([]);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [diagnostico, setDiagnostico] = useState(null);
  const [searchBy, setSearchBy] = useState('nome');
  const [search, setSearch] = useState('');
  const [initDate, setInitDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [pageLoading, setPageLoading] = useState(true);

  async function loadHistorico() {

    if (user.data.crm) {
      if (!user.data.clinica){
        return
      }
    }

    let id = user.data.cnpj ? user.data.id : user.data.clinica.id
    await api.get(`/diagnostico?id_clinica=${id}`).then(({ data }) => {
      setDiagnosticos(data)
      setDiagnosticosArray(data)
    }).catch(({ err }) => {
      console.log(err)
    })
  }

  const handleModal = (diagnosticoSelecionado) => {
    setDiagnostico(diagnosticoSelecionado)
    onOpen()
  }

  useEffect(() => {
    loadHistorico().then(() => {
      setPageLoading(false)
    })
  }, [])

  useEffect(() => {
    searchHistory()
  }, [initDate, endDate,search])

  const searchHistory = () => {
    if(diagnosticosArray.length){
      if (searchBy === 'nome') {
        var diagnosticos = diagnosticosArray.filter(item => item.paciente.pessoa.nome.toLowerCase().includes(search.toLowerCase()))
        setDiagnosticos(diagnosticos)
      }
      if (searchBy === 'cpf') {
        var diagnosticos = diagnosticosArray.filter(item => item.paciente.pessoa.cpf.toLowerCase().includes(search.toLowerCase()))
        setDiagnosticos(diagnosticos)
      }
  
  
      if (initDate != '' && endDate != '') {
        const newDiagnostico = diagnosticosArray.filter(item => dayjs(item.data_hora).isAfter(dayjs(initDate)) )
        const newDiagnostico_2 = newDiagnostico.filter(item => dayjs(endDate).isAfter(dayjs(item.data_hora)))
        setDiagnosticos(newDiagnostico_2)
      }else{
        if (initDate != '') {
          const newDiagnostico = diagnosticosArray.filter(item => dayjs(item.data_hora).isAfter(dayjs(initDate)) )
          setDiagnosticos(newDiagnostico)
        }
        if (endDate != '') {
          const newDiagnostico = diagnosticosArray.filter(item => dayjs(endDate).isAfter(dayjs(item.data_hora)))
          setDiagnosticos(newDiagnostico)
        }
      }
      
    }
   
  }

  return (
    <Box className='historico-container'>
      <header>
        <NavbarComp showEntrarButton={true} />
      </header>
      {pageLoading ? <Flex justifyContent='center' alignItems='center' w='100vw' h='80vh'>
        <Spinner emptyColor='gray.200' thickness='5px' color='#3b83c3' size='xl' />
      </Flex> :
        <Box id='historico-body'>

          <Box id='main-content'>
            <Box display='flex' w='90%' m='1.0rem 0rem' mt='1.5rem'>
              <Select onChange={(e) => setSearchBy(e.target.value)} w='15%' icon={<GiSettingsKnobs />} mr='1rem' bgColor={'white'} cursor={'pointer'}>
                <option value='nome'>Nome</option>
                <option value='cpf'>CPF</option>
              </Select>
              <Input w='70%' placeholder='Procurar paciente' mr='0.5rem' onChange={(e)=>setSearch(e.target.value)} bgColor={'white'} />
              <Input w='15%' type='date' onChange={(e) => setInitDate(e.target.value)} />
              <Input w='15%' type='date' onChange={(e) => setEndDate(e.target.value)} />
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
              <ModalOverlay />

              <ModalContent  w='100%' color={"#FFFFFF"} bgColor={"#0b2a45"}>

                <ModalHeader textAlign={"center"}>Informações do Paciente</ModalHeader>
                <ModalCloseButton />

                <ModalBody w='100%'>

                  <Box position='relative' padding='0.5rem 0' marginBottom='1rem'>
                    <Divider />
                    <AbsoluteCenter borderRadius='1rem'  fontWeight='bold' fontSize='1.5rem' color={'#3b83c3'} bg='white' px='4'>
                      Paciente
                    </AbsoluteCenter>
                  </Box>

                  <Flex borderRadius='1rem' padding='1.25rem' background='#3b83c3' height='auto' justify='flex-start' alignItems='flex-start' color='white' w='100%' flexDirection='row' flexWrap='wrap'>

                  <div style={{ flex: '0 0 50%', boxSizing: 'border-box', marginTop: '0.5rem' }}>
                  <Text fontWeight='bold' as='span'>Name: </Text>
                  <Text padding='0 0.5rem' as='span' fontWeight='regular'>{diagnostico?.paciente.pessoa.nome}</Text>
                  </div>

                  <div style={{ flex: '0 0 50%', boxSizing: 'border-box', marginTop: '0.5rem' }}>
                  <Text fontWeight='bold' as='span'>CPF: </Text>
                  <Text padding='0 0.5rem' as='span' fontWeight='regular'>{diagnostico?.paciente.pessoa.cpf}</Text>
                  </div>

                  <div style={{ flex: '0 0 50%', boxSizing: 'border-box', marginTop: '0.5rem' }}>
                  <Text fontWeight='bold' as='span'>Telefone: </Text>
                  <Text padding='0 0.5rem' as='span' fontWeight='regular'>{diagnostico?.paciente.pessoa.telefone}</Text>
                  </div>

                  <div style={{ flex: '0 0 50%', boxSizing: 'border-box', marginTop: '0.5rem' }}>
                  <Text fontWeight='bold' as='span'>Rua: </Text>
                  <Text padding='0 0.5rem' as='span' fontWeight='regular'>{diagnostico?.paciente.logradouro}</Text>
                  </div>

                  <div style={{ flex: '0 0 50%', boxSizing: 'border-box', marginTop: '0.5rem' }}>
                  <Text fontWeight='bold' as='span'>Bairro: </Text>
                  <Text padding='0 0.5rem' as='span' fontWeight='regular'>{diagnostico?.paciente.bairro}</Text>
                  </div>

                  <div style={{ flex: '0 0 50%', boxSizing: 'border-box', marginTop: '0.5rem' }}>
                  <Text fontWeight='bold' as='span'>Número:</Text>
                  <Text padding='0 0.5rem' as='span' fontWeight='regular'>{diagnostico?.paciente.numero}</Text>
                  </div>

                  <div style={{ flex: '0 0 50%', boxSizing: 'border-box', marginTop: '0.5rem' }}>
                  <Text fontWeight='bold' as='span'>Cidade: </Text>
                  <Text padding='0 0.5rem' as='span' fontWeight='regular'>{diagnostico?.paciente.cidade}</Text>
                  </div>

                  </Flex>

                  <Box position='relative' padding='0.5rem 0' marginBottom='1rem' marginTop='2rem'>
                  <Divider />
                  <AbsoluteCenter borderRadius='1rem' fontWeight='bold' fontSize='1.5rem' color={'#3b83c3'} bg='white' px='4'>
                    Modelo
                  </AbsoluteCenter>
                </Box>

                <Flex borderRadius='1rem' padding='1.25rem' background='#3b83c3' height='auto' color='white' w='100%' flexDirection='row' flexWrap='wrap'>

                  {/* Linha de Informações de Texto */}
                  <Flex style={{ flex: '0 0 100%',  marginTop: '0.5rem',  textAlign:'center'}}>
                    <div style={{ flex: '0 0 40%' }}>
                      <Text fontWeight='bold' as='span'>Modelo: </Text>
                      <Text padding='0 0.5rem' as='span' fontWeight='regular'>{diagnostico?.modelo}</Text>
                    </div>
                    <div style={{ flex: '0 0 30%' }}>
                      <Text fontWeight='bold' as='span'>Classificação do Modelo: </Text>
                      <Text padding='0 0.5rem' as='span' fontWeight='regular'>{diagnostico?.resultado_modelo}</Text>
                    </div>
                    <div style={{ flex: '0 0 20%' }}>
                      <Text fontWeight='bold' as='span'>Diagnóstico: </Text>
                      <Text padding='0 0.5rem' as='span' fontWeight='regular'>{diagnostico?.resultado_real}</Text>
                    </div>
                  </Flex>

                  {/* Linha de Imagem de Raio X e Mapa de Calor */}
                  <Flex  style={{ flex: '0 0 100%',  marginTop: '1rem', justifyContent: 'center'}}>
                    {/* Seção de Imagem de Raio X */}
                    <div >
                      <Text fontWeight='bold'>Raio X: </Text>
                      {diagnostico?.raio_x && (
                        <img
                          src={diagnostico?.raio_x}
                          alt="Uploaded"
                          style={{  maxWidth: '70%', height: '25rem' }}
                        />
                      )}
                    </div>

                    {/* Seção de Imagem do Mapa de Calor */}
                    <div >
                      <Text fontWeight='bold'>Mapa de calor: </Text>
                      {diagnostico?.mapa_calor && (
                        <img
                          src={diagnostico?.mapa_calor}
                          alt="Uploaded"
                          style={{ width: '20rem', height: '25rem' }}
                        />
                      )}
                    </div>
                  </Flex>

                </Flex>
                 
                </ModalBody>
              </ModalContent>
            </Modal>

            <Box id='result-context'>
              {
                diagnosticos.map((user, index) => {
                  return (
                    <Box className='historico-line' onClick={() => handleModal(user)} key={index}>
                      <HistoricoCard data={user} />
                    </Box>
                  );
                })
              }
            </Box>
            
          </Box>
        </Box>
      }
      <Box>
        <MyFooter />
      </Box>
    </Box>
  )
}
