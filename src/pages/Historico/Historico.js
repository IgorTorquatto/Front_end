import React from 'react'
import { useEffect, useState } from 'react';
import { NavbarComp } from '../../components/Header/NavbarComp'
import { Box, border } from '@chakra-ui/react'
import { MyFooter } from '../../components/Footer/Footer'
import { HistoricoCard } from '../../components/Cards/HistoricoCard'
import { LuSearch } from "react-icons/lu";
import { api } from '../../services/api.ts'
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@chakra-ui/react'
import './Historico.css'


export const Historico = () => {

  const [diagnosticosArray, setDiagnosticosArray] = useState([]);
  const [diagnosticosOnDisplay, setDiagnosticosOnDisplay] = useState([]);
  const { data: user } = useSelector((state) => state.tokens);

  const diagnosticosExemple = [{
    exameID: '213213',
    exameType: 'Pneumonia', 
    dateTime: Date.now(), 
    nomePaciente: 'Robert Carmos Sobreira', 
    cpf: '987.654.432-12',
    examePositivo: true,
    nascimento: '11/11/1999',
    sexo: 'Masculino',
    telefone: '(88) 98888-8888',
    bloodType: 'AB+'
  },
  {
  exameID: '243213',
  exameType: 'Pneumonia', 
  dateTime: Date.now(), 
  nomePaciente: 'Maria Joaquina Soares', 
  cpf: '927.614.432-12',
  examePositivo: false,
  nascimento: '11/11/1999',
  sexo: 'Feminino',
  telefone: '(88) 98888-8888',
  bloodType: 'AB+'
  }]

  function initExemple(){
    for (var index = 0; diagnosticosExemple.length < 30; index++) {
      diagnosticosExemple.push(diagnosticosExemple[index%2]);
    }
    setDiagnosticosArray(diagnosticosExemple)
    setDiagnosticosOnDisplay(diagnosticosExemple)
    console.log('Tamanho: ', diagnosticosArray.length)
  }

  async function loadDiagnosticos() {
    await api.get(`/diagnostico?id_medico=${user.data.id}`).then(({ data }) => {
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

    console.log('Diagnosticos Array: ', diagnosticosArray.length)
    console.log('OnDisplay: ', diagnosticosOnDisplay.length)
  }

  useEffect(() => {
    console.log('useEffect is running');
    const fetchData = async () => {
      console.log('Fetching data...');
      await initExemple();
      await loadDiagnosticos();
    };
  
    fetchData();
  }, []);

  return (
    <Box className='historico-container'>
      <Box>
        <NavbarComp showEntrarButton={true}/>
      </Box>
      <Box id='historico-body'>
        <Box id='main-content'>
          <Box id='searchbar-context'>
            <Box>

            </Box>
            <Input placeholder='Busque Por: Nome, CPF ou Número do Exame'  mr='0.5rem' onChange={searchOnHistory} backgroundColor={'white'}/>
              {/*
              <Box className='search-icon' cursor={'pointer'} onClick={() => window.alert("Botão de buscar clicado")}>
                <LuSearch className='icone-lupa' />
                <span className='search-text'>Buscar</span>
              </Box>  
              */}
          </Box>
          <Box id='result-context'>
            {
              diagnosticosOnDisplay.map((user, index) => {
                return(
                  <Box className='historico-line' key={index}>
                    <HistoricoCard data={user}/>
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
