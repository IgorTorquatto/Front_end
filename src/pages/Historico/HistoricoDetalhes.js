import React from 'react'
import { NavbarComp } from '../../components/Header/NavbarComp'
import { Box} from '@chakra-ui/react'
import { MyFooter } from '../../components/Footer/Footer'
import { useLocation } from 'react-router-dom';

import './HistoricoDetalhes.css'


export const HistoricoDetalhes = () => {

    const location = useLocation();
    const { data } = location.state || {};

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
      
    const formatoData = new Intl.DateTimeFormat('pt-BR', options);

    return(
        <Box className='detalhes-page-container'>
            <Box>
                <NavbarComp showEntrarButton={true}/>
            </Box>
            <Box className='card-details-container'>
                <Box className='exame-infos'>
                    <h6 className='t'>SOBRE O EXAME:</h6>
                    <Box className='detalhes-b2'>
                        <Box className='b2-son'>
                        <span className='detalhes-text'>ID do exame: {data.exameID}</span>
                        <span className='detalhes-text'>Tipo de exame: {data.exameType}</span>
                        </Box>
                        <Box className='b2-son'>
                        <span className='detalhes-text'>Data e hora: {formatoData.format(data.dateTime)}</span>
                        <span className='detalhes-text'>Resultado: {data.positivo === true ? 'Positivo' : 'Negativo'} para a doença</span>
                        </Box>
                    </Box>
                </Box>
                <Box className='paciente-infos'>
                    <h6>DADOS DO PACIENTE: </h6>
                    <Box className='detalhes-b2'>
                        <Box className='b2-son'>
                        <span className='detalhes-text'>Nome: {data.nomePaciente}</span>
                        <span className='detalhes-text'>Data de nascimento: {data.nascimento}</span>             
                        </Box>
                        <Box className='b2-son'>
                        <span className='detalhes-text'>CPF: {data.cpf}</span>  
                        <span className='detalhes-text'>Telefone: {data.telefone}</span>
                        </Box>
                        <Box className='b2-son'>
                        <span className='detalhes-text'>Sexo: {data.sexo}</span>    
                        <span className='detalhes-text'>Tipo sanguíneo: {data.bloodType}</span>
                        </Box>
                    </Box>
                    
                </Box>
                <Box className='pdf-viewer-context'>
                    <h6>EXAME EM PDF:</h6>
                    <Box>

                    </Box>
                </Box>
    
            </Box>
            <Box>
                <MyFooter />
            </Box>
        </Box>
    );
}