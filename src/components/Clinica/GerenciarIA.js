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
import { RepeatIcon } from '@chakra-ui/icons';;

export const GerenciarIA = () => {

  const { data: user } = useSelector((state) => state.tokens);
  const [classes, setClasses] = useState([])
  const [numCasos, setNumCasos] = useState([]) 
  const [modelos, setModelos] = useState([]) 
  const [totalImagens, setTotalImagens] = useState(0)


  const loadImagensTreinamento = async () => {
    await api.post(`/diagnostico/imagens/treinamento`, {'clinica_id': user.data.id}).then(({ data }) => {
      setClasses(data.classes)
      setNumCasos(data.data)
      setTotalImagens(data.data.at(-1))
    }).catch( () => {
      
    })
  }

  const loadModelosClinca = async () => {
    await api.get(`/modelo`, { cnpj: user.data.cnpj }).then( ({ data }) => {
      console.log(data)
      setModelos(data)
    })
  }


  useEffect(() => {
    loadImagensTreinamento().then(() => {})
    loadModelosClinca().then(() => {})
  }, [])

  return (
    <div className='gerenciarIA-container'>
      <div className='gerenciarIA-top'>
        <h2>Banco de imagens</h2>
      </div>

      <div className='gerenciarIA-image-bank' >
        <h4>Existem {totalImagens} imagens disponíveis para treinamento.</h4>
        <Flex bg={'white'} shadow={'sm'} gap={4} padding={'10px'} borderRadius={'10px'}  width={'100%'} flexDirection={'row'} alignContent={'center'} justifyContent={'center'}>
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
              <Button colorScheme='blue' w={'md'}><Icon as={RepeatIcon} /></Button>
          </Flex>
        </Flex>
      </div>

      <div className='gerenciarIA-top'>
        <h2>Modelos</h2>
      </div>

      <div className='gerenciarIA-model-details'>
        <Stack spacing={4} w={'90%'}>
          <CardModelo modelo={{acuracia: '97.3', f1score:'98.4', nome: 'Modelo 001 - Pneumonia, Tuberculose, COVID-19'}} />
        </Stack>
      </div>
    </div>
  )
}
