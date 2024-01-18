import React from 'react'
import "./GerenciarIA.css";
import { useState } from 'react';
import {
  Select,
  Box,
  Container,
  Grid,
  Text,
  Button,
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
                background={'white'}
              />
            </Box>
        </Box>
      </div>
      <div className='gerenciarIA-model-details'>
        <Container background={'blue.600'} maxW={'container.lg'} h={40} borderRadius={'20px'} ml={'5'}>
          <Box display={'flex'} alignItems={'center'} paddingTop={'8'}>
            <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }} gap={4}>
              <Container background={'white'} borderRadius={'10px'} mb={{ base: 2, md: 0 }} h={10} display={'flex'} alignItems={'center'}>
                Precisão: "Valor placeholder"
              </Container>
              <Container background={'white'} borderRadius={'10px'} mb={{ base: 2, md: 0 }} h={10} display={'flex'} alignItems={'center'}>
                Acurácia: "Valor placeholder"
              </Container>
              <Container background={'white'} borderRadius={'10px'} mb={{ base: 2, md: 0 }} h={10} display={'flex'} alignItems={'center'}>
                F1-Score: "Valor placeholder"
              </Container>
              <Container background={'white'} borderRadius={'10px'} mb={{ base: 2, md: 0 }} h={10} display={'flex'} alignItems={'center'}>
                Recall: "Valor placeholder"
              </Container>
            </Grid>
          </Box>
        </Container>
      </div>
      <div className='gerenciarIA-image-bank'>
        <h4>Existem X novas imagens no banco de imagens.</h4>
        <Box mt={'20px'}>
          <Text>
            X imagens de Covid.
          </Text>
          <Text>
            X imagens de Pulmão Saudável.
          </Text>
          <Text>
            X imagens de Pneumonia.
          </Text>
          <Text>
            X imagens de Tuberculose.
          </Text>
        </Box>
      </div>
      <div className='gerenciarIA-requests'>
        <Button colorScheme='blue'>Solicitar novo treinamento</Button>
      </div>
    </div>
    
  )
}
