import React from 'react'
import "./GerenciarIA.css";
import { useState } from 'react';
import {
  Text,
  Select,
  Box,
} from '@chakra-ui/react'

export const GerenciarIA = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const models = [
    { value: '1', label: 'Pneumonia - Crianças de até 5 anos' },
    { value: '2', label: 'Pneumonia, Covid, Tuberculose - mapa de calor' },
  ]

  return (
    <div className='gerenciarIA-container'>
      <div className='gerenciarIA-top'>
        <h2>Gerenciar IA</h2>
      </div>
      <div className='gerenciarIA-model-select'>
        <Box w='30%' padding='2rem 0'>
            <Box w='100%' >
              <Select
                value={selectedModel}
                onChange={setSelectedModel}
                options={models}
                isSearchable
                placeholder="Selecione um modelo"
              />
            </Box>
        </Box>
      </div>
    </div>
    
  )
}
