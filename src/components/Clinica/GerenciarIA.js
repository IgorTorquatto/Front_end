import React, { useEffect, useState } from 'react'
import "./GerenciarIA.css";
import {
  Button,
  Stack,
  TableContainer,
  Table,
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Flex,
  Icon,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  
} from '@chakra-ui/react'
import { CardModelo } from '../Cards/CardModelo';
import { api } from '../../services/api';
import { useSelector } from 'react-redux';
import { RepeatIcon } from '@chakra-ui/icons';
import { Spinner } from 'react-bootstrap';
;

export const GerenciarIA = () => {

  const { data: user } = useSelector((state) => state.tokens);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [classes, setClasses] = useState([])
  const [numCasos, setNumCasos] = useState([]) 
  const [modelos, setModelos] = useState([])
  const [solicitado, setSolicitado] = useState(true)
  const [solicitacao, setSolicitacao] = useState(null)
  const [loadingButton, setLoadingButton] = useState(false)
  const [isLoadingTable, setIsLoadingTable] = useState(false)
  const [totalImagens, setTotalImagens] = useState(0)


  const loadImagensTreinamento = async () => {
    setIsLoadingTable(true)
    await api.post(`/diagnostico/imagens/treinamento`, {'clinica_id': user.data.id}).then(({ data }) => {
      setClasses(data.classes)
      setNumCasos(data.data)
      setTotalImagens(data.data.at(-1))
      setIsLoadingTable(false)
    }).catch( () => {
      
    })
  }

  const loadModelosClinca = async () => {
    await api.get(`/modelo`, { cnpj: user.data.cnpj }).then( ({ data }) => {
      setModelos(data.data)
    }).catch(() => {

    })
  }

  const loadExisteSolicitacao = async () => {
    await api.get(`/requisicao?id_clinica=${user.data.id}`).then(({ data }) => {
      if (data.data.length == 0) {
        setSolicitado(false)
        return
      }
      setSolicitacao(data.data.at(0))
      console.log(solicitacao)
    })
  }


  useEffect(() => {
    loadImagensTreinamento().then(() => {})
    loadModelosClinca().then(() => {})
    loadExisteSolicitacao().then(() => {})
  }, [])

  const loadCriarSolicitacao = async () => {
    const data_requisicao = {
      quantidade_imagens: totalImagens,
      id_clinica: user.data.id,
      data_hora: new Date(),
    } 
    const data_email = {
      nome: user.data.nome,
      cnpj: user.data.cnpj,
      total_imagens: totalImagens,
      doenca: classes
    }
    
    await api.post('/requisicao', data_requisicao).catch( (e) => { console.log(e)} )
    await api.post('/email/requisicao', data_email).catch( (e) => { console.log(e)} )
  }

  function handleSocitacaoTreinamento() {
    onClose()
    setLoadingButton(true)

    toast.promise(
      loadCriarSolicitacao().then(() => {
        setLoadingButton(false)
        setSolicitado(true)
      }),
      {
        success: { title: 'Solitação enviada', description: 'Atualizações no modelo serão realizadas nas próximas semanas', duration: 6000 },
        error: { title: 'Falha', description: 'Solicitação não enviada', duration: 6000 },
        loading: { title: `Solicitando treinamento`, description: 'Por favor espere' },
    })
  }

  return (
    <div className='gerenciarIA-container'>
      <div className='gerenciarIA-top'>
        <h2>Banco de imagens</h2>
      </div>

      <div className='gerenciarIA-image-bank' >
        <Flex bg={'white'} shadow={'sm'} gap={4} padding={'10px'} borderRadius={'10px'}  width={'100%'} flexDirection={'row'} flexWrap={'wrap'} >
          <Flex w={'100%'} alignContent={'center'} justifyContent={'center'}>
            <h4>Existem {totalImagens} imagens disponíveis para treinamento</h4>
          </Flex>
          <Flex w={'100%'} alignContent={'center'} justifyContent={'space-around'}>
            <Flex w='50%' justifyContent={'center'}>
              { isLoadingTable ? <Spinner thickness='4px' size='lg'/> :
              <TableContainer padding={'10px'}>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>Diagnóstico</Th>
                      <Th>Número de imagens</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{classes[0]}</Td>
                      <Td textAlign={'center'} fontWeight={'500'} color={'green.600'} > {numCasos[0]} </Td>
                    </Tr>
                    <Tr>
                      <Td>{classes[1]}</Td>
                      <Td textAlign={'center'} fontWeight={'500'} color={'green.600'} > {numCasos[1]} </Td>
                    </Tr>
                    <Tr>
                      <Td>{classes[2]}</Td>
                      <Td textAlign={'center'} fontWeight={'500'} color={'green.600'} > {numCasos[2]} </Td>
                    </Tr>
                    <Tr>
                      <Td>{classes[3]}</Td>
                      <Td textAlign={'center'} fontWeight={'500'} color={'green.600'} > {numCasos[3]} </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              }
            </Flex>
            <Flex w="30%" alignContent={'center'} textAlign={'center'} justifyContent={'center'}  flexWrap={'wrap'}>
                <h3>Solicitar novo treinamento</h3>
                <Button colorScheme='blue' w={'md'} isLoading={loadingButton} isDisabled={solicitado} onClick={onOpen}><Icon as={RepeatIcon} /></Button>
                { solicitacao &&
                <Text fontWeight={'500'} title={solicitacao.data_hora} mt={4}>*Solicitação ainda não atendida</Text>
                }
            </Flex>
          </Flex>
        </Flex>
      </div>

      <div className='gerenciarIA-top'>
        <h2>Modelos</h2>
      </div>

      <div className='gerenciarIA-model-details'>
        <Stack spacing={4} w={'90%'}>
          {
            modelos.map((modelo, index) => {
              return <CardModelo modelo={modelo} />
            })
          }
        </Stack>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Solicitar novo treinamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Ao clicar em "Solicitar", será feita uma requisição para que se use as novas imagens no treinamento de um modelo.  
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={4} onClick={handleSocitacaoTreinamento}>
              Solicitar
            </Button>
            <Button variant='ghost' onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
