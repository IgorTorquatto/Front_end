import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, Td, Th, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { FormDetalhesIA } from '../Forms/FormDetalhesIA'

export const GerenciarModelos = () => {
  const [modelos, setModelos] = useState([])
  const [isExcluirLoading, setIsExcluirLoading] = useState(false)
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const loadModelos = async () => {
    await api.get('/modelo').then(({ data }) => {
      setModelos(data.data)
    }).catch((error) => {
        
    })
  }

  const excluirmodelo = async (id) => {
    setIsExcluirLoading(true)
    await api.delete(`/modelo/${id}`).then(({ data }) => {
        setIsExcluirLoading(false)
        loadModelos()
        toast({
            title: 'Modelo excluido com sucesso',
            status: 'success',
            duration: 3000
        })
    }).catch(() => {
        setIsExcluirLoading(false)
        toast({
            title: 'Modelo não excluido',
            status: 'error',
            duration: 3000
        })
    })
  }

  function handleExcluirModelo(id_modelo) {
    const confirm = window.confirm('Excluir o modelo?')

    if (!confirm) {
      return
    }

    const modeloExcluir = modelos.find((modelo) => modelo.id === id_modelo)
    if (!modeloExcluir) {
      return
    }

    excluirmodelo(modeloExcluir.id)
  }

  const reLoadModelos = () => {
    loadModelos()
    onClose()
  }

  useEffect(() => {
    loadModelos()
  }, [])

  return (
    <div>
      <h2>Modelos  <span style={{cursor: 'pointer', color: 'green'}} onClick={onOpen}>[+]</span></h2>
      <Table bg={'white'}>
        <Tr>
          <Th>Nome</Th>
          <Th>Arquivo</Th>
          <Th>CNPJ</Th>
          <Th></Th>
        </Tr>
        {
          modelos.map((modelo, index) => {
            return (
              <Tr>
                <Td>{modelo.nome}</Td>
                <Td>{modelo.arquivo}</Td>
                <Td>{modelo.cnpj}</Td>
                <Td><Button isLoading={isExcluirLoading} colorScheme='red' value={modelo.id} onClick={(event) => handleExcluirModelo(event.target.value)}>Excluir</Button></Td>
              </Tr>
            )
          })
        }
      </Table>
 
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Cadastrar Modelo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex mt={'-3'} justifyContent={'center'}>
                    <FormDetalhesIA reLoadModelos={reLoadModelos}/>
                </Flex>
            </ModalBody>
        </ModalContent>
    </Modal>

    </div>

  )
}
