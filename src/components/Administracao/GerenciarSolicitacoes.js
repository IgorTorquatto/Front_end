import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, Td, Text, Th, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { api } from '../../services/api'

const STATUS = ['Requisitado', 'Em_Execucao', 'Concluido', 'Aceito', 'Finalizado']

export const GerenciarSolicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState([])
  const [solicitacaoSelected, setSolicitacaoSelected] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const selectSolicitacao = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const loadSolicitacoes = async () => {
    await api.get('/requisicao').then(({ data }) => {
      setSolicitacoes(data.data)
    }).catch((error) => {
        
    })
  }

  const excluirSolicitacao = async (id) => {
    setIsLoading(true)
    await api.delete(`/requisicao/${id}`).then(({ data }) => {
        setIsLoading(false)
        loadSolicitacoes()
        toast({
            title: 'Solicitacao excluido com sucesso',
            status: 'success',
            duration: 3000
        })
    }).catch(() => {
        setIsLoading(false)
        toast({
            title: 'Solicitacao não excluido',
            status: 'error',
            duration: 3000
        })
    })
  }

  function handleExcluirSolicitacao(id_solicitacao) {
    const confirm = window.confirm('Excluir o solitção?')

    if (!confirm) {
      return
    }

    const solicitacaoExcluir = solicitacoes.find((solicitacao) => solicitacao.id === id_solicitacao)
    if (!solicitacaoExcluir) {
      return
    }
    excluirSolicitacao(solicitacaoExcluir.id)
  }

  const atualizarSolicitacao = async (solicitacao) => {
    await api.put(`/requisicao/${solicitacao.id}`, solicitacao)
  }

  function handleAtualizarSolicitacao() {
    let solicitacao = Object.assign({}, solicitacaoSelected)
    solicitacao.status = selectSolicitacao.current.value
    setIsLoading(true)
    atualizarSolicitacao(solicitacao).then(() => {
        loadSolicitacoes()
        onClose()
        setIsLoading(false)
        toast({
            title: 'Solicitacao atualizada',
            status: 'success',
            duration: 3000
        })
    }).catch((error) => {
        onClose()
        setIsLoading(false)
        toast({
            title: 'Solicitacao não atualizada',
            status: 'error',
            duration: 3000
        })
    })
  }

  function handleAbrirTelaAtualizar(id_solicitacao) {
    const solicitacaoAtualizar = solicitacoes.find((solicitacao) => solicitacao.id === id_solicitacao)
    setSolicitacaoSelected(solicitacaoAtualizar)
    onOpen()
  }

  useEffect(() => {
    loadSolicitacoes()
  }, [])

  return (
    <div>
      <h2>Solicitações</h2>
      <Table bg={'white'}>
        <Tr>
          <Th>Quantidade de imagens</Th>
          <Th>Data e hora</Th>
          <Th>Status</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
        {
          solicitacoes.map((solicitacao, index) => {
            return (
              <Tr>
                <Td>{solicitacao.quantidade_imagens}</Td>
                <Td>{solicitacao.data_hora}</Td>
                <Td>{solicitacao.status}</Td>
                <Td><Button isDisabled={isLoading} colorScheme='red' value={solicitacao.id} onClick={(event) => handleExcluirSolicitacao(event.target.value)}>Excluir</Button></Td>
                <Td><Button isDisabled={isLoading} colorScheme='blue' value={solicitacao.id} onClick={(event) => handleAbrirTelaAtualizar(event.target.value)}>Atualizar</Button></Td>
              </Tr>
            )
          })
        }
      </Table>
 
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Atualizar Status</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>Solicitacao: {solicitacaoSelected?.quantidade_imagens} imagens - {solicitacaoSelected?.data_hora}</Text>
                <Select ref={selectSolicitacao}>
                    {STATUS.map((status, index) => {
                        return <option disabled={status === solicitacaoSelected?.status} value={status}>{status}</option>
                    })}
                </Select>

            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleAtualizarSolicitacao}>Atualizar</Button>
                <Button colorScheme='gray' onClick={onClose}>Cancelar</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>

    </div>

  )
}
