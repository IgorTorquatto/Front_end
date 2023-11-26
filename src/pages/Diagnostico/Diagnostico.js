import React from 'react'
import { NavbarComp } from '../../components/Header/NavbarComp'

import './Diagnostico.css';
import { useEffect, useState } from 'react';
import { Avatar, Box, Text, Button, Textarea, Checkbox } from '@chakra-ui/react'
import Select from 'react-select';
import { api } from '../../services/api.ts'
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PDFReport from '../../components/Pdf/PdfViewer'
import { Document, Page, pdfjs } from 'react-pdf';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';
import * as dayjs from 'dayjs'
import { Link } from 'react-router-dom';

import { MyFooter } from '../../components/Footer/Footer'
import './Diagnostico.css'


require('dayjs/locale/br')

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
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
  const [imageCam, setImageCam] = useState(null);
  const [error, setError] = useState(false);
  const [pdfDataUri, setPdfDataUri] = useState(null);
  const [termo, setTermo] = useState(false);
  const [downloadLaudo, setDownloadLaudo] = useState(false);
  const [observacoes, setObservacoes] = useState('Suas observações virão aqui...');

  const { data: user } = useSelector((state) => state.tokens);

  const models = [
    { value: '1', label: 'Pneumonia - Crianças de até 5 anos' },
    { value: '2', label: 'Pneumonia - Crianças, de 5 a 10 anos' },
    { value: '3', label: 'Pneumonia, Covid, Tuberculose' },
  ]

  async function loadPatients() {
    await api.get(`/paciente?id_medico=${user.data.id}`).then(({ data }) => {
      console.log(data)
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
    }).catch(({ err }) => {
      console.log(err)
    })
  }

  useEffect(() => {
    loadPatients()
  }, [])

  useEffect(() => {
    if (prediction != null) {
      createPDF()

    }
  }, [prediction])


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

  function base64ToBlob(base64) {
    var parts = base64.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  function arrayToBase64(subarray) {
    // Converte o subarray para um ArrayBuffer
    var buffer = new Float32Array(subarray).buffer;

    // Converte o ArrayBuffer para uma string base64
    var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));

    return base64String;
  }

  async function onSubmitImage() {
    if (patient === null) {
      setError(true)
      return
    }
    if (selectedModel === null) {
      setError(true)
      return
    }
    if (uploadedImageData === null) {
      setError(true)
      return
    }
    const formData = new FormData();
    formData.append('image', uploadedImageData);
    await api.post(`/predict/${selectedModel.value}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(({ data }) => {
      console.log(data)

      var imageData = data.image;
      
      setImageCam(imageData)
      setPrediction(data.predictions)
    }).catch(({ err }) => {
      console.log(err)
    })
  }

  const handlePatient = (patient) => {
    setSelectedPatient(patient)
    setPatient(patientsArray.find(item => item.id === patient.value))

  }
  function calcularIdade(dataNascimento) {
    var dataAtual = new Date();
    var dataNasc = new Date(dataNascimento);

    var diferenca = dataAtual - dataNasc;

    var idade = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));

    return idade;
  }
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const createPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.setFont('helvetica', 'regular');
    doc.text('Hermes.IA', 20, 20);
    doc.text(`Paciente: ${patient?.pessoa?.nome}`, 20, 30);
    doc.text(`Idade: ${calcularIdade(patient?.pessoa?.data_nascimento)}`, 20, 40);
    doc.text(`Sexo: ${patient?.sexo}`, 20, 50);
    doc.text(`Idade: ${user?.data?.pessoa?.nome}`, 120, 30);
    doc.text(`Idade: ${dayjs().format('DD/MM/YYYY')}`, 120, 40);

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`Tipo de exame: ${selectedModel.label}`, 20, 100);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Observações do Profissional`, 20, 120);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'italic');
    doc.text(`${observacoes}`, 20, 130);

    doc.addPage();

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text("Mapa de calor", 85, 30)
    doc.addImage(uploadedImage, 'JPEG', 4, 30, 100, 80);
    doc.addImage(imageCam, 'JPEG', 106, 30, 100, 80);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Laudo do modelo:`, 20, 140);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'regular');
    doc.text('Hermes.IA', 20, 20);
    // Adicione mais informações conforme necessário

    // Converte o PDF para base64
    const pdfDataUri = doc.output('datauristring');

    // Atualizar o número de páginas para exibição no visor de PDF
    setNumPages(1);
    setPdfDataUri(pdfDataUri)

    // Exibe o PDF diretamente na página
    // const pdfContainer = document.getElementById('pdf-container');
    // pdfContainer.innerHTML = `<embed src="${pdfDataUri}" width="100%" height="500px" type="application/pdf" />`;
  };
  return (
    <body>
      <header><NavbarComp showEntrarButton={true} /></header>
      {!prediction ? <Box display='flex' w='100%' alignItems='center' justifyContent='center' flexDirection='column'>
        <Box w='30%' padding='4rem 0'>
          <Box w='100%' >
            <Text lineHeight='0.2rem' fontWeight='bold'>SELECIONE O PACIENTE</Text>
            <Select
              value={selectedPatient}
              onChange={handlePatient}
              options={patients}
              isSearchable
              placeholder="Digite para buscar..."
            />


          </Box>

          <Box w='100%' mt='2rem'>
            <Text lineHeight='0.2rem' fontWeight='bold'>SELECIONE O TIPO DE EXAME</Text>
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
          {imageCam && (
            <img src={`data:image/jpeg;base64,${imageCam}`} />
          )}
          <Button w='100%' colorScheme={error ? 'red' : 'blue'} onClick={() => onSubmitImage()}>Gerar Laudo</Button>
          <Box display='flex' justifyContent='space-between'>
            <Box display={error && patient === null ? 'flex' : 'none'} color='red' alignItems='center' >
              <AiOutlineInfoCircle />
              <Text ml='0.2rem' mt='1rem'>Selecione um Paciente</Text>
            </Box>
            <Box display={error && selectedModel === null ? 'flex' : 'none'} color='red' alignItems='center' >
              <AiOutlineInfoCircle />
              <Text ml='0.2rem' mt='1rem'>Selecione um Modelo</Text>
            </Box>

            <Box display={error && uploadedImageData === null ? 'flex' : 'none'} color='red' alignItems='center' >
              <AiOutlineInfoCircle />
              <Text ml='0.2rem' mt='1rem'>Faça upload da imagem</Text>
            </Box>
          </Box>


        </Box>
      </Box> :
        <Box display='flex' w='100%' alignItems='center' justifyContent='center' flexDirection='column'>
          <Box margin='4rem 0' w='50%'>
            <Box display='flex' justifyContent='space-between'>
              <Box>
                <Text>Nome: {patient?.pessoa?.nome}</Text>
                <Text>CPF: {patient?.pessoa?.cpf}</Text>
              </Box>
              <Box>
                <Text>Idade: {calcularIdade(patient?.pessoa?.data_nascimento)}</Text>
              </Box>

            </Box>
            <Box padding='0.5rem' background='#323639'>
              <div>
                <embed src={pdfDataUri} width="100%" height="500px" type="application/pdf" />

              </div>
            </Box>

            <Box display='flex' flexDirection='column' fontWeight='bold' w='100%' justifyContent='center' alignItems='center' mt='1.5rem'>
              <Text>
                Adicione uma observação
              </Text>
              <Textarea onChange={(e) => setObservacoes(e.target.value)} />

            </Box>
            <Box display='flex' alignItems='center' mt='1rem'>
              <Checkbox border='black' size='lg' borderRadius='2px' mr='0.5rem' borderWidth='3px' onChange={(e) => setTermo(e)} /> <Text as='span' >Declaro que li e os termo ai   <Text as='span' color='blue'><Link to='/termos'>Termos ai`</Link></Text> </Text>

            </Box>
            <Box display='flex' alignItems='center' mt='1rem'>
              <Checkbox border='black' size='lg' borderRadius='2px' mr='0.5rem' borderWidth='3px' onChange={(e) => setTermo(e)} /><Text as='span'>Baixar o  laudo com a previsão do modelo</Text>

            </Box>
            <Box display='flex' mt='2rem' justifyContent='space-around'>
              <Button colorScheme='red' borderRadius='1rem'>Revogar Laudo</Button>
              <Button colorScheme='green' borderRadius='1rem'>Confirmar Laudo</Button>
            </Box>
          </Box>

        </Box>
      }


      <div>
        <MyFooter />
      </div>

    </body>
  )
}
