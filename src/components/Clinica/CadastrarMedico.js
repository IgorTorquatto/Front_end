import React, { useEffect, useState } from 'react'
import { FormCadastro } from '../Forms/FormCadastro'
import './CadastrarMedico.css'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { useHistorico } from '../../hooks/useHistorico';
import { api } from '../../services/api'
import Select from 'react-select';

export const CadastrarMedico = () => {
  return (
    <>
      <div className="cadastrarMedico-container">
        <div className="cadastrarMedico-title">
          <h2>Cadastrar Médico</h2>
        </div>
        
          <div className="cadastrarMedico-formulario">
            <FormCadastro />
          </div>

      </div>
    </>
  )
}
