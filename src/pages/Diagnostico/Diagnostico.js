import React from 'react'
import { NavbarComp } from '../../components/Header/NavbarComp'

import './Diagnostico.css';
import DiagnosticaLogoBW from '../../assets/logo d bw.png'
import { useEffect, useState } from 'react';
import { Box, Text, Button, Textarea, Checkbox, Radio, RadioGroup, Stack, Select as SelectChakra, Spinner, Flex, Input, Center } from '@chakra-ui/react'
import Select from 'react-select';
import { api } from '../../services/api.ts'
import { AiOutlineInfoCircle } from 'react-icons/ai';
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux';
import * as dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom';
import { MyFooter } from '../../components/Footer/Footer'
import './Diagnostico.css'

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
  const [predictionLabel, setPredictionLabel] = useState(null);
  const [imageCam, setImageCam] = useState(null);
  const [error, setError] = useState(false);
  const [pdfDataUri, setPdfDataUri] = useState(null);
  const [termo, setTermo] = useState(null);
  const [downloadLaudo, setDownloadLaudo] = useState(false);
  const [outroLaudo, setOutroLaudo] = useState(null)
  const [outroLaudoErro, setOutroLaudoErro] = useState(false)
  const [observacoes, setObservacoes] = useState('Seu laudo vem aqui...');
  const [loadingLaudo, setLoadingLaudo] = useState(false)
  const [resultLaudo, setResultLaudo] = useState(null)
  const [resultReal, setResultReal] = useState(null);
  const [laudoError, setLaudoError] = useState(false);
  const [obsState, setobsState] = useState(true);

  const [pageLoading, setPageLoading] = useState(true);

  const [clinica, setClinica] = useState(null);
  const [clinicas, setClinicas] = useState([]);
  const [clinicasArray, setClinicasArray] = useState([]);

  const history = useNavigate()

  const { data: user } = useSelector((state) => state.tokens);

  const models = [
    { value: '1', label: 'Pneumonia, Covid, Tuberculose - mapa de calor' },
    { value: '2', label: 'Pneumonia - Crianças de até 5 anos' },
  ]

  const loadClinicas = async () => {
    if (user.data.clinica) { return }
    await api.get(`/medico/${user.data.id}/clinica`).then(({data})=>{
      setClinicas(data.data)
      const clinicasOptions= []
      data.data.map(item => {
        const clinica = {
          value: item.id,
          label: `Nome: ${item.nome} CNPJ: ${item.cnpj}`
        }
        clinicasOptions.push(clinica)
      })

      setClinicasArray(clinicasOptions)
    })
  }

  const handleClinica = (clinicaSelecionada) =>{
    const clinicaFind = clinicas.find(clinica => clinica.id === clinicaSelecionada.value)
    setClinica(clinicaFind)
  }

  async function loadPatients() {
    await api.get(`/paciente?id_clinica=${user.data.clinica.id}`).then(({ data }) => {
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

  const handleCheckboxChange = (e, setter) => {
    setter(e.target.checked);
  };

  useEffect(() => {
    (async () => {
      await loadClinicas().then(() => {
        setPageLoading(false)
      })
    })()
  }, [])

  useEffect(() => {
    if (clinica) {
      user.data.clinica = clinica
    }

    if (user.data.clinica) {
      setPageLoading(true)
      loadPatients().then(()=>{
        setPageLoading(false)
      })
    }
  }, [clinica])
  
  useEffect(() => {
    if (prediction != null) {
      createPDF()
    }
  }, [prediction, observacoes])


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedImageData(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Cria uma nova imagem
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          // Cria um canvas
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;

          // Desenha a imagem no canvas
          context.drawImage(img, 0, 0, img.width, img.height);

          // Converte o conteúdo do canvas para JPEG
          const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.9);

          // Atualiza o estado com a imagem JPEG
          setUploadedImage(jpegDataUrl);
        };
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

  async function submitLaudo() {
    if (!resultLaudo) {
      setLaudoError(true)
      return
    } 
    setLaudoError(false)

    if (resultReal === 'OUTRO') {
      if (outroLaudo === '' || !outroLaudo) {
        setOutroLaudoErro(true)
        return
      }
    }
    setOutroLaudoErro(false)
    
    if(observacoes === 'Seu laudo vem aqui...' || observacoes.trim().length == 0) {
      setobsState(false)
      return
    } 
    setobsState(true)

    if(termo == null || termo == false) {
      setTermo(false)
      return
    }

    
    const diagnostico = {
      modelo: selectedModel.label,
      raio_x: uploadedImage,
      id_medico: user.data.id,
      id_clinica: clinica.id,
      id_paciente: patient.id,
      laudo_medico: pdfDataUri,
      data_hora: new Date(),
      mapa_calor: "data:image/jpeg;base64," + imageCam,
      resultado_modelo: predictionLabel,
      resultado_real: resultLaudo == "1" ? predictionLabel : resultReal === "OUTRO" ? outroLaudo : resultReal
    }

    await api.post(`/diagnostico`, diagnostico).then(({ data }) => {
      downloadPDF(data.data.laudo_medico)
      history('/historico')
    }).catch(({ err }) => {
      console.log(err)
    })
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
    setLoadingLaudo(true)
    await api.post(`/predict/${selectedModel.value}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(({ data }) => {
      setLoadingLaudo(false)
      console.log(data)
      var imageData = data.image;
      setImageCam(imageData)
      setPredictionLabel(data.predictions[0])
      setPrediction(+data.predictions[1])
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

  const createPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('D.IAgnóstica - Seu assistente em diagnósticos', 20, 20);



    doc.rect(15, 35, 180, 30);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text(`Paciente: ${patient?.pessoa?.nome}`, 20, 42);
    doc.text(`Idade: ${calcularIdade(patient?.pessoa?.data_nascimento)}`, 20, 52);
    doc.text(`Sexo: ${patient?.sexo}`, 20, 62);
    doc.text(`Medico: ${user?.data?.pessoa?.nome}`, 120, 42);
    doc.text(`Idade: ${dayjs().format('DD/MM/YYYY')}`, 120, 52);

    doc.rect(15, 70, 180, 16);

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`Exame: Raio X do tórax`, 20, 80);

    doc.rect(15, 90, 180, 150);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Laudo Médico:`, 20, 100);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');

    doc.addImage(DiagnosticaLogoBW, 'PNG', 45, 140, 120, 72)


    // Para não deixar o texto escapar do PDF

    const maxWidth = 160;
    const text = `${observacoes}`;
    const lines = doc.splitTextToSize(text, maxWidth);

    const lineHeight = 10;
    lines.forEach((line, index) => {
      doc.text(line, 20, 120 + index * lineHeight);
    });

    doc.rect(15, 245, 180, 20);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'italic');
    doc.text(`D.IAgnóstica, seu assistente em diagnósticos.\nUniversidade Federal do Cariri - grupodiagnosticatic@gmail.com`, 20, 254);

    doc.addPage();

    doc.rect(15, 10, 180, 10)

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text("Mapa de Calor", 20, 17);

    doc.addImage(imageCam, 'JPEG', 40, 22, 135, 270);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'italic');
    doc.text('*O nível de ativação representa as regiões da imagem mais cruciais para a \nclassificação.', 20, 285);

    // Converte o PDF para base64'
    const pdfDataUri = doc.output('datauristring');

    // Atualizar o número de páginas para exibição no visor de PDF
    setPdfDataUri(pdfDataUri)

    // Exibe o PDF diretamente na página
    // const pdfContainer = document.getElementById('pdf-container');
    // pdfContainer.innerHTML = `<embed src="${pdfDataUri}" width="100%" height="500px" type="application/pdf" />`;
  };

  return (
    <body style={{backgroundColor: '#F8F8FF'}}>
      <header><NavbarComp showEntrarButton={true} /></header>
      {pageLoading ?  <Flex justifyContent='center' alignItems='center' w='100vw' h='80vh'>
      <Spinner emptyColor='gray.200' thickness='5px' color='#3b83c3' size='xl'/>
        </Flex> : 
        !user.data.clinica ? 
        <Box  m='2rem 0' mb='4rem' display='flex' flexDirection='column' alignItems='center' justifyContent='flex-start' mt='4rem' height='80vh' >
          <Box w='80%'>
          <Text lineHeight='0.2rem' fontWeight='bold'>SELECIONE A CLÍNICA</Text>
            <Select
            
              value={clinica}
              onChange={handleClinica}
              options={clinicasArray}
              isSearchable
              placeholder="Digite para buscar..."
            />
          </Box>
        </Box> :
        !prediction ? <Box display='flex' w='100%' alignItems='center' justifyContent='center' flexDirection='column'>
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
            background='#F8F8F9'
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

          <Button w='100%' colorScheme={error ? 'red' : 'blue'} isLoading={loadingLaudo} onClick={() => onSubmitImage()}>Gerar Laudo</Button>
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
          <Box padding='0.5rem' background='#323639'>
            <div>
              <embed src={pdfDataUri} width="100%" height="500px" type="application/pdf" />
            </div>
          </Box>


          <Box display='flex' flexDirection='column' fontWeight='bold' w='100%'
            justifyContent='left' alignItems='left' mt='1.5rem'>
            
            <RadioGroup fontWeight='normal' onChange={setResultLaudo} value={resultLaudo} style={{ border: '2px solid black', padding: '8px', borderRadius: '4px' }}>
              <Text justifySelf='center'>
                Classificação do modelo: <b>{(Math.floor(prediction * 100) / 100) * 100}% para {predictionLabel}</b>
              </Text>
              <Text mb='-0.2rem'>
                A classificação do modelo está correta?
              </Text>
              <Stack direction='row' gap='30px' mb='1.0rem' mt='0.5rem'>
                <Radio value='1' style={{ border: '1px solid #000', borderRadius: '50%' }}>Sim</Radio>
                <Radio value='2' style={{ border: '1px solid #000', borderRadius: '50%' }}>Não</Radio>
              </Stack>
              {laudoError == true && <Text fontWeight={'bold'} mt='0.5rem' justifySelf='center' color='red'>Por favor responda</Text>}

              {resultLaudo == 2 && 
                <Box>
                  <Text mb='0.2rem'>Qual o diagnóstico?</Text>
                  <Flex>
                    <Center w={'60%'}>
                      <SelectChakra bg={'white'} onChange={(e) => setResultReal(e.target.value)}>
                        <option value={"PNEUMONIA"}>Pneumonia</option>
                        <option value={"TURBECULOSE"}>Tuberculose</option>
                        <option value={"COVID"}>COVID-19</option>
                        <option value={"NORMAL"}>Normal</option>
                        <option value={"OUTRO"}>Outro</option>
                      </SelectChakra>
                    </Center>

                    {resultReal == "OUTRO" &&
                    <Center w={'35%'} ml={'0.5rem'}> 
                      <Input bg={'white'} placeholder='Digite aqui o dignóstico' onChange={(e) => setOutroLaudo(e.target.value)} />
                    </Center>
                    }
                  </Flex>
                  {outroLaudoErro == true && <Text fontWeight={'bold'} mt='0.5rem' justifySelf='center' color='red'>Por favor digite o diagnóstico</Text>}
                  
                </Box>
              }
            </RadioGroup>


            <Box display='flex' flexDirection='column' fontWeight='bold' w='100%' justifyContent='center' alignItems='left' mt='1rem'>
              <Text mb='-0.05rem'>Descrição do laudo</Text>
              <Textarea style={{border: '1px solid black'}} backgroundColor='white' onChange={(e) => setObservacoes(e.target.value)} />
            </Box>
              {obsState == false && <Text mt='1rem' justifySelf='center' color='red'>A descrição médica é necessária.</Text>}
            {termo == false && <Text mt='1rem' justifySelf='center' color='red'>É obrigatório aceitar os Termos de Uso</Text>}
            <Box display='flex' alignItems='center' mt='1rem'>
              <Checkbox border='black' size='lg' borderRadius='2px' mr='0.5rem' borderWidth='3px' onChange={(e) => setTermo(e.target.checked)} /> <Text as='span' >Declaro que li e aceito os <Text as='span' color='blue'><Link to='/termos'>Termos de uso</Link></Text> </Text>
            </Box>

          <Box display='flex' alignItems='center' mt='1rem'>
            <Checkbox border='black' size='lg' borderRadius='2px' mr='0.5rem' borderWidth='3px' onChange={(e) => setDownloadLaudo(e)} /><Text as='span'>Baixar o  laudo com a classificação do modelo</Text>
          </Box>

          <Box display='flex' mt='2rem' justifyContent='space-around'>
            <Button colorScheme='blue' width={'10rem'} borderRadius='1rem' onClick={() => setPrediction(null)}>Voltar</Button>
            <Button colorScheme='green' width={'10rem'} borderRadius='1rem' onClick={() => { submitLaudo() }}>Confirmar Laudo</Button>
          </Box>
          
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
