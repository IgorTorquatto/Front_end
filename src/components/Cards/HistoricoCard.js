import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { LuDownload } from "react-icons/lu";

import './HistoricoCard.css'
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { cpf_mask } from '../Forms/form-masks';

export const HistoricoCard = ({ data }) => {

    const [downloadIconColor, setDownloadIconColor] = useState('white')

    const changeIconColor = (mouseEvent) => {
        mouseEvent === 'out' ? setDownloadIconColor('white') : setDownloadIconColor('#3B83C3')
    }

    function downloadPDF(pdfDataUri) {
    
        var link = document.createElement('a');
        link.href = pdfDataUri;
    
        link.download = `laduo_${data.paciente.pessoa.nome}_${dayjs(new Date(data.data_hora)).format('DD/MM/YYYY')}.pdf`;
    

        document.body.appendChild(link);
    

        link.click();

        document.body.removeChild(link);
    }

    return (
        <Box id='historico-card-container' cursor={'pointer'} >
            <Box className='card-title-context'>
                <Box id='paciente-nome'>
                    <span className='hcard-text'>Paciente: <b>{data.paciente.pessoa.nome}</b></span>
                </Box>

                <Box id='paciente-cpf'>
                    <span className='hcard-text'>CPF: <b>{cpf_mask(data.paciente.pessoa.cpf)}</b></span>
                </Box>

                <Box id='resultado-exame'>
                    <span className='hcard-text'>Diagnóstico: <b>{data.resultado_real}</b></span>
                </Box>
                
                <Box id='medico-nome'>
                    <span className='hcard-text left'>Médico responsável: <b>{data.paciente.medico.nome}</b></span>
                </Box>

                <Box id='data-info'>
                    <span className='hcard-text right'>{dayjs(new Date(data.data_hora)).format('DD/MM/YYYY')}</span>
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
