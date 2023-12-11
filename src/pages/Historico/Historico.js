import React, { useState, useEffect } from 'react'
import { NavbarComp } from '../../components/Header/NavbarComp'
import { Box, border } from '@chakra-ui/react'
import { MyFooter } from '../../components/Footer/Footer'
import { HistoricoCard } from '../../components/Cards/HistoricoCard'
import { LuSearch } from "react-icons/lu";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../services/api.ts'

import './Historico.css'


export const Historico = () => {
  const { data: user } = useSelector((state) => state.tokens);

  const [searchedText, setSearchedText] = useState("");
  const [diagnosticos, setDiagnosticos] = useState([]);

  const data = [{
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
  }]

  const initExemple = () => {
    for (let index = 0; index < 30; index++) {
      data.push(data[0]);
    }
  }

  async function loadHistorico() {
    await api.get(`/diagnostico?id_medico=${user.data.id}`).then(({ data }) => {
      setDiagnosticos(data)
      console.log(data)

    }).catch(({ err }) => {
      console.log(err)
    })
  }
  
  useEffect(() => {
    loadHistorico()
  }, [])

  return (
    <Box className='historico-container'>
      {initExemple()}
      <Box>
        <NavbarComp showEntrarButton={true}/>
      </Box>
      <Box id='historico-body'>
        <Box id='main-content'>
          <Box id='searchbar-context'>
            <Box>

            </Box>
            <Select
                id='historico-searchbar'
                value={searchedText}
                onChange={setSearchedText}
                placeholder="Digite para buscar..."
                menuIsOpen={false}
                components={{ DropdownIndicator: false }}
              />
              <Box className='search-icon' cursor={'pointer'} onClick={() => window.alert("Botão de buscar clicado")}>
                <LuSearch className='icone-lupa' />
                <span className='search-text'>Buscar</span>
              </Box>  
          </Box>
          <Box id='result-context'>
            {
              data.map((user, index) => {
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
