import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, Td, Th, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { FormCadastroClinica } from '../Forms/FormCadastroClinica'

export const GerenciarClinicas = () => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [clinicas, setClinicas] = useState([])
  const [isExcluirLoading, setIsExcluirLoading] = useState(false)

  const loadCliniacas = async () => {
    await api.get('/clinica').then(({ data }) => {
      setClinicas(data.data)
    }).catch(() => {
  
    })
  }

  const excluirClinica = async (id) => {
    setIsExcluirLoading(true)
    await api.delete(`/clinica/${id}`).then(({ data }) => {
      toast({
        title: 'Clínica excluida com sucesso',
        status: 'success',
        duration: 3000
      })
      setIsExcluirLoading(false)
      loadCliniacas()
    }).catch(() => {
      toast({
        title: 'Clínica não excluida',
        status: 'error',
        duration: 3000
      })
      setIsExcluirLoading(false)
    })
  }

  useEffect(() => {
    loadCliniacas()
  }, [])

  const reLoadClinicas = () => {
    loadCliniacas()
    onClose()
  }

  function handleExcluirClinica(id_clinica) {
    const confirm = window.confirm('Excluir a clínica?')

    if (!confirm) {
      return
    }

    const clinicaExcluir = clinicas.find((clinica) => clinica.id === id_clinica)
    if (!clinicaExcluir) {
      return
    }

    excluirClinica(clinicaExcluir.id)
  }

  return (
    <div>
      <h2>Clínicas <span style={{cursor: 'pointer', color: 'green'}} onClick={onOpen}>[+]</span></h2>
      <Table bg={'white'}>
        <Tr>
          <Th>Nome</Th>
          <Th>CNPJ</Th>
          <Th>E-mail</Th>
          <Th></Th>
        </Tr>
        {
          clinicas.map((clinica, index) => {
            return (
              <Tr>
                <Td>{clinica.nome}</Td>
                <Td>{clinica.cnpj}</Td>
                <Td>{clinica.email}</Td>
                <Td><Button isLoading={isExcluirLoading} colorScheme='red' value={clinica.id} onClick={(event) => handleExcluirClinica(event.target.value)}>Excluir</Button></Td>
              </Tr>
            )
          })
        }
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastrar Clínica</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormCadastroClinica reLoadClinicas={reLoadClinicas} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>

  )
}
