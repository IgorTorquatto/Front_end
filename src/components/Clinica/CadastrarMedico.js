import React, { useEffect, useState } from 'react'
import { FormCadastro } from '../Forms/FormCadastro'
import './CadastrarMedico.css'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { useHistorico } from '../../hooks/useHistorico';
import { api } from '../../services/api';
import Select from 'react-select';

export const CadastrarMedico = () => {
  const [step, setStep] = useState(1)
  const [medicId, setMedicId] = useState(null)
  const [medicCRM, setMedicCRM] = useState(null)
  const [medicos, setMedicos] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorAdd, setErrorAdd] = useState('')

  const { data: user } = useSelector((state) => state.tokens);

  const { handleHistorico } = useHistorico()

  const SubmitMedico = () => {
    setLoading(true)
    const medic = {
      crm: medicCRM
    }
    api.put(`/clinica/${user.data.id}/medico`, medic).then(({ data }) => {
      handleHistorico(null)
      setMedicCRM('')
      setLoading(false)
      setErrorAdd("")
    }).catch(({ }) => {
      setErrorAdd("Ocorreu um erro")
      setLoading(false)
    })
  }

  useEffect(()=>{
    setStep(1)
  },[])


  return (
    <>
      <div className="cadastrarMedico-container">
        <div className="cadastrarMedico-title">
          <h2>Cadastrar Médico</h2>
        </div>
        {
          step === 1 &&
          <div className='escolher-cadastro-medico'>
            <Button colorScheme='blue' padding='1rem' onClick={() => setStep(2)}>Cadastrar novo Medico</Button>
            <Button colorScheme='blue' padding='1rem' onClick={() => setStep(3)}>Adicionar Medico pelo CRM</Button>
          </div>}
        {
          step === 2 &&
          <div className="cadastrarMedico-formulario">
            <FormCadastro />
          </div>
        }
        {step === 3 &&
          <div className="cadastrarMedico-formulario">
            <Text fontWeight='bold'>Digite o CRM e clique em adicionar</Text>
            <Flex  w='100%'>
              <Input background='white' onChange={(e) => setMedicCRM(e.target.value)} />
              <Button colorScheme={errorAdd !== "" ? "red" : "blue"} isLoading={loading} padding='1rem' onClick={() => SubmitMedico()}>Adicionar</Button>
            </Flex>
            {errorAdd !== "" && <Text color='red' ml='1rem'>{errorAdd}</Text>}
          </div> 
        }


      </div>
    </>
  )
}
