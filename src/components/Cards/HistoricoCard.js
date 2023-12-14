import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { ImCross, ImCheckmark } from "react-icons/im";
import { LuDownload } from "react-icons/lu";

import './HistoricoCard.css'
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
export const HistoricoCard = ({ data }) => {

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
        return (
            <Box id='result-icon-context'>
                <Box id='icon-context'>
                    {positivo === true ? <ImCheckmark color='green' size={'22px'} /> : <ImCross color='red' size={'22px'} />}
                </Box>
                <span className='hcard-text'>
                    {positivo === true ? 'Positivo' : 'Negativo'} Para A Doença
                </span>
            </Box>
        )
    }

    const handleCardClick = () => {
        navigate('/historico/detalhes', { state: { data } });
    }

    function downloadPDF(pdfDataUri) {
        // Seu PDF em formato Data URI (substitua isso pelo seu próprio Data URI)
    
        // Cria um link <a> temporário
        var link = document.createElement('a');
        link.href = pdfDataUri;
    
        // Define o atributo 'download' para indicar que é um download
        link.download = 'seu_arquivo.pdf';
    
        // Adiciona o link ao documento
        document.body.appendChild(link);
    
        // Simula um clique no link para iniciar o download
        link.click();
    
        // Remove o link do documento
        document.body.removeChild(link);
      }

    return (
        <Box className='historico-card-container' cursor={'pointer'} >
            <Box className='card-title-context'>
                <span className='hcard-text'>Modelo: {data.modelo}</span>
                <span className='hcard-text'>Data e Hora: {dayjs(new Date(data.data_hora)).format('DD/MM/YYYY')}</span>
            </Box>
            <Box className='historico-card-body'>
                <Box id='paciente-info'>
                    <span className='hcard-text'>Paciente: {data.paciente.pessoa.nome}</span>
                    <span className='hcard-text'>CPF: {data.paciente.pessoa.cpf}</span>
                </Box>
                <Box id='resultado-exame'>
                    <span className='hcard-text'>Resultado: {data.resultado_real}</span>


                </Box>
                <Box id='hist-download-button-context'>
                    <button type="button" className="btn btn-outline-light" onClick={(event) => {
                        event.stopPropagation();
                        downloadPDF(data.laudo_medico)
                    }}
                        onMouseEnter={() => changeIconColor("in")}
                        onMouseLeave={() => changeIconColor("out")}>
                        <LuDownload color={downloadIconColor} size={'24px'} />
                    </button>

                </Box>
            </Box>
        </Box>
    );
};
