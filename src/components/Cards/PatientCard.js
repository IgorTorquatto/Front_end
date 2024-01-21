import React, { useState } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import './PatientCard.css';
import {cpf_mask} from '../Forms/form-masks'

const PatientCard = ({ paciente, openInfo, openEdit }) => {
  const [buttonEditColor, setButtonEditColor] = useState('white');
  const [buttonInfoColor, setButtonInfoColor] = useState('white');

  const changeButtonContent = (setFunction, mouseEvent) => {
    mouseEvent === 'out' ? setFunction('white') : setFunction('#3B83C3');
  };

  return (
    <Box
      color='white'
      className='patientBox'
      w='100%'
      py='0.5rem'
      px='1.5rem'
      borderRadius='1rem'
      margin='1.5rem 0'
      display='flex'
      justifyContent='center'
      alignItems='center'
      background='#3b83c3'
    >
      <Box display='flex' py='0.5rem' pr='0.5rem' w='100%'>
        <div id='patientInformations'>
          <div>
            <p>Paciente:</p>
            <span style={{ fontSize: 'larger' }}>{paciente.pessoa.nome}</span>
          </div>
          <div>
            <p>CPF:</p>
            <span style={{ fontSize: 'larger' }}>{cpf_mask(paciente.pessoa.cpf)}</span>
          </div>
        </div>
      </Box>
      <Stack spacing={3}>
        <Button
          leftIcon={<FaBars />}
          onClick={() => {
            openInfo(paciente);
          }}
          color={buttonInfoColor}
          variant='outline'
          onMouseEnter={() => changeButtonContent(setButtonInfoColor, 'in')}
          onMouseLeave={() => changeButtonContent(setButtonInfoColor, 'out')}
        >
          Informações
        </Button>
        <Button
          leftIcon={<CiEdit />}
          onClick={() => {
            openEdit(paciente);
          }}
          color={buttonEditColor}
          variant='outline'
          onMouseEnter={() => changeButtonContent(setButtonEditColor, 'in')}
          onMouseLeave={() => changeButtonContent(setButtonEditColor, 'out')}
        >
          Editar
        </Button>
      </Stack>
    </Box>
  );
};

export default PatientCard;
