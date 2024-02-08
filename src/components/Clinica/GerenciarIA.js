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
  TableCaption,
  Tbody,
  Flex,
  Icon,
} from '@chakra-ui/react'
import { CardModelo } from '../Cards/CardModelo';
import { api } from '../../services/api';
import { useSelector } from 'react-redux';
import { RepeatIcon } from '@chakra-ui/icons'; import { CardRequisicao } from '../Cards/CardRequisicao';
;

export const GerenciarIA = () => {

  const { data: user } = useSelector((state) => state.tokens);
  const [classes, setClasses] = useState([])
  const [numCasos, setNumCasos] = useState([])
  const [modelos, setModelos] = useState([])
  const [requisicoes, setRequisicoes] = useState([])
  const [totalImagens, setTotalImagens] = useState(0)
  const [diagnosticos, setDiagnosticos] = useState([])
  const [error, setError] = useState("")


  const loadImagensTreinamento = async () => {
    await api.post(`/diagnostico/imagens/treinamento`, { 'clinica_id': user.data.id }).then(({ data }) => {
      setClasses(data.classes)
      setNumCasos(data.data)
      setTotalImagens(data.data.at(-1))
    }).catch(() => {

    })
  }

  const loadDiagnosticos = async () => {
    await api.get(`/diagnostico?usada=false&clinica_id=${user.data.id}`).then(({ data }) => {
      console.log("diagnosticos >>>>>>", data)
      setDiagnosticos(data)
    }).catch(() => {

    })
  }
  const updateDiagnosticos = async () => {
    let ids = diagnosticos.map(item => item.id)
    await api.put(`/diagnostico/update_usada`, ids).then(({ data }) => {
      console.log("update", data)
    }).catch(() => {

    })
  }

  const loadModelosClinca = async () => {
    await api.get(`/modelo`, { cnpj: user.data.cnpj }).then(({ data }) => {
      setModelos(data)
    }).catch(()=>{
      
    })
  }

  const loadRequisicoes = async () => {
    await api.get(`/requisicao?id_clinica=${user.data.id}`).then(({ data }) => {
      console.log("requisicoes", data.data)
      setRequisicoes(data.data)
    }).catch(()=>{
      
    })
  }

  const sendRequisition = async () => {
    let data = {
      data_hora: new Date(),
      quantidade_imagens: diagnosticos.length,
      id_clinica: user.data.id,
    }

    await api.post(`/requisicao`, data).then(() => {
      loadImagensTreinamento().then(() => { })
      updateDiagnosticos()
      loadRequisicoes()
    }).catch(()=>{

    })
  }


  useEffect(() => {
    loadImagensTreinamento().then(() => { })
    loadModelosClinca().then(() => { })
    loadRequisicoes()
    loadDiagnosticos()
  }, [])

  // Função para verificar se a diferença entre duas datas é menor que 1 semana
  function diferencaMenorQueUmaSemana(data1, data2) {
    const primeiraData = new Date(data1);
    const segundaData = new Date(data2);

    const diferencaEmMilissegundos = Math.abs(segundaData - primeiraData);

    const diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);

    return diferencaEmDias < 7;
  }

  const disableRequisicao = () => {
      if(requisicoes.length>0){
        return diferencaMenorQueUmaSemana(requisicoes[0].data_hora,new Date()) || diagnosticos.length < 1
      }

      return true
  }

  return (
    <div className='gerenciarIA-container'>
      <div className='gerenciarIA-top'>
        <h2>Banco de imagens</h2>
      </div>

      <div className='gerenciarIA-image-bank' >
        <h4>Existem {totalImagens} imagens disponíveis para treinamento.</h4>
        <Flex bg={'white'} shadow={'sm'} gap={4} padding={'10px'} borderRadius={'10px'} width={'100%'} flexDirection={'row'} alignContent={'center'} justifyContent={'center'}>
          <Flex w='50%'>
            <TableContainer padding={'10px'}>
              <Table variant='simple'>
                <TableCaption>Imagens disponíveis para treinamento por diagnóstico.</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Diagnóstico</Th>
                    <Th>Número de imagens</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{classes[0]}</Td>
                    <Td fontWeight={'500'} color={'green.600'} >{numCasos[0]}</Td>
                  </Tr>
                  <Tr>
                    <Td>{classes[1]}</Td>
                    <Td fontWeight={'500'} color={'green.600'} >{numCasos[1]}</Td>
                  </Tr>
                  <Tr>
                    <Td>{classes[2]}</Td>
                    <Td fontWeight={'500'} color={'green.600'} >{numCasos[2]}</Td>
                  </Tr>
                  <Tr>
                    <Td>{classes[3]}</Td>
                    <Td fontWeight={'500'} color={'green.600'} >{numCasos[3]}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          <Flex w="30%" alignContent={'center'} textAlign={'center'} justifyContent={'center'} alignItems={'center'} flexWrap={'wrap'}>
            <h3>Solicitar novo treinamento</h3>
            <Button isDisabled={disableRequisicao()} colorScheme='blue' onClick={() => { sendRequisition() }} w={'md'}>{disableRequisicao() ? "Não possível solicitar" :"Solicitar"}</Button>
          </Flex>
        </Flex>
      </div>
{requisicoes.length > 0 &&
<>
<div className='gerenciarIA-top'>
        <h2>Requisições</h2>
      </div>

      <div className='gerenciarIA-model-details'>
        <Stack spacing={4} w={'90%'}>
          
          {requisicoes.map(item => (
            <CardRequisicao requisicao={item} />
          ))}
        </Stack>
      </div>
</>
     }

      <div className='gerenciarIA-top'>
        <h2>Modelos</h2>
      </div>

      <div className='gerenciarIA-model-details'>
        <Stack spacing={4} w={'90%'}>
          <CardModelo modelo={{ acuracia: '97.3', f1score: '98.4', nome: 'Modelo 001 - Pneumonia, Tuberculose, COVID-19' }} />
        </Stack>
      </div>
    </div>
  )
}
