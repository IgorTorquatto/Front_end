import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { ImCross, ImCheckmark} from "react-icons/im";
import { LuDownload } from "react-icons/lu";

import './HistoricoCard.css'
import { useNavigate } from 'react-router-dom';

export const HistoricoCard = ({data}) => {
    
    const [downloadIconColor, setDownloadIconColor] = useState('white')
    const navigate = useNavigate();

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
    
    const changeIconColor = (mouseEvent) => {
       mouseEvent === 'out' ? setDownloadIconColor('white') : setDownloadIconColor('#3B83C3')
    }

    const mostrarResultadoExame = (positivo) => {
        return(
           <Box id='result-icon-context'>
            <Box id='icon-context'>
                {positivo === true ? <ImCheckmark color='green' size={'22px'}/> : <ImCross color='red' size={'22px'}/>}
            </Box>
            <span className='hcard-text'>
                {positivo === true ? 'Positivo' : 'Negativo'} Para A Doença
            </span>
           </Box> 
        )
    }

    const handleCardClick = () => {
        navigate('/historico/detalhes', { state: {data} });
    }

  return (
    <Box className='historico-card-container' onClick={() => {handleCardClick()}} cursor={'pointer'} >
        <Box className='card-title-context'>
            <span className='hcard-text'>ID do exame: {data.exameID}</span>
            <span className='hcard-text'>Tipo de exame: {data.exameType}</span>
            <span className='hcard-text'>Data e Hora: {formatoData.format(data.dateTime)}</span>
        </Box>
        <Box className='historico-card-body'>
            <Box id='paciente-info'>
                <span className='hcard-text'>Paciente: {data.nomePaciente}</span>
                <span className='hcard-text'>CPF: {data.cpf}</span>
            </Box>
            <Box id='resultado-exame'>
                <span className='hcard-text'>Resultado:</span>

                {mostrarResultadoExame(data.examePositivo)} 
    
            </Box>
            <Box id='hist-download-button-context'>
            <button type="button" className="btn btn-outline-light"  onClick={(event) => {
                    event.stopPropagation();
                    window.alert('download pdf do exame')
                    }}
                    onMouseEnter={() => changeIconColor("in")} 
                    onMouseLeave={() => changeIconColor("out")}>
                <LuDownload color={downloadIconColor} size={'24px'}/>
            </button>
                
            </Box>
        </Box>
    </Box>
  );
};
