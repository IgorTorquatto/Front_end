import React from 'react'
import { NavbarComp } from '../../components/Header/NavbarComp'
import './Diagnostico.css';
import { useEffect, useState } from 'react';
import { Avatar, Box, Text, Button } from '@chakra-ui/react'
import Select from 'react-select';
import { api } from '../../services/api.ts'

export const Diagnostico = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageData, setUploadedImageData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patient, setPatient] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [patients, setPatients] = useState([]);
  const [patientsArray, setPatientsArray] = useState([]);
  const [prediction, setPrediction] = useState(null);


  const models = [
    { value: '1', label: 'Pneumonia - Crianças de até 5 anos' },
    { value: '2', label: 'Pneumonia - Crianças, de 5 a 10 anos' },
  ]

  async function loadPatients() {
    await api.get('/paciente').then(({ data }) => {
      const patientsValues = []
      setPatientsArray(data)
      data.map((item) => {
        var patient = {
          value: item.id,
          label: `Nome: ${item.pessoa.nome} CPF: ${item.pessoa.cpf}`
        }
        patientsValues.push(patient)
      })
      setPatients(patientsValues)
    })
  }

  useEffect(() => {
    loadPatients()
  }, [])


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedImageData(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContainerClick = () => {
    document.getElementById('file-input').click();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    setUploadedImageData(file)

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmitImage() {
    console.log(uploadedImageData)
    const formData = new FormData();
      formData.append('image', uploadedImageData);
    await api.post(`/predict/${selectedModel.value}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      } 
    }).then(({ data }) => {
      console.log(data.predictions[0][0])
      setPrediction(data.predictions[0][0])
    }).catch(({err})=>{
      console.log(err)
    })
  }

  const handlePatient = (patient)=>{
    setSelectedPatient(patient)
    setPatient(patientsArray.find(item=> item.id === patient.value))
    
  }
  function calcularIdade(dataNascimento) {
    var dataAtual = new Date();
    var dataNasc = new Date(dataNascimento);
  
    var diferenca = dataAtual - dataNasc;
  
    var idade = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));

    return idade;
  }
  return (
    <body>
      <header><NavbarComp showEntrarButton={true} /></header>
      {!prediction ?<Box display='flex' w='100%' alignItems='center' justifyContent='center' flexDirection='column'>
        <Box w='30%'>
          <Box w='100%'>
            <Text lineHeight='0.2rem'>SELECIONE O PACIENTE</Text>
            <Select
              value={selectedPatient}
              onChange={handlePatient}
              options={patients}
              isSearchable
              placeholder="Digite para buscar..."
            />


          </Box>

          <Box w='100%' mt='2rem'>
            <Text lineHeight='0.2rem'>SELECIONE O TIPO DE EXAME</Text>
            <Select
              value={selectedModel}
              onChange={setSelectedModel}
              options={models}
              isSearchable
              placeholder="Digite para buscar..."
            />


          </Box>

          <Box
            mt='2rem'
            textAlign='center'
            border={isDragging ? '2px solid #4CAF50' : '2px dashed #ccc'}
            borderRadius='20px'
            padding='20px'
            cursor='pointer'
            marginBottom='20px'
            onClick={handleContainerClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            w='100%'
            height='50vh'
            display='flex'
            alignItems='center'
            justifyContent='center'
            background='d8d8d8'
          >
            {!uploadedImage &&
              <Box lineHeight='0.5rem'>
                <p id='titleDragInput'>Clique para fazer o upload </p>
                <p id='titleDragInput'>ou arraste sua imagem</p>
              </Box>

            }
            <input
              type="file"
              id="file-input"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />


            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Uploaded"
                style={{ maxWidth: '100%', maxHeight: '300px' }}
              />
            )}
          </Box>
          <Button w='100%' colorScheme='blue' onClick={()=>onSubmitImage()}>Gerar Laudo</Button>
        </Box>
      </Box>:
      <Box display='flex' w='100%' alignItems='center' justifyContent='center' flexDirection='column'>
        <Box mt='2rem' w='50%'>
          <Box display='flex' justifyContent='space-between'>
            <Box>
            <Text>Nome: {patient?.pessoa?.nome}</Text>
            <Text>CPF: {patient?.pessoa?.cpf}</Text>
            </Box>
            <Box>
            <Text>Idade: {calcularIdade(patient?.pessoa?.data_nascimento)}</Text>
            </Box>

          </Box>
        </Box>

      </Box>
       }
      
      


    </body>
  )
}
