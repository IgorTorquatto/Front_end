import React from 'react'
import { NavbarComp } from '../../components/Header/NavbarComp'
import { Link, useNavigate } from 'react-router-dom';
import './Pacientes.css'

import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineInfoCircle } from 'react-icons/ai';
import { GiSettingsKnobs } from "react-icons/gi";
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../services/api.ts'
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Textarea, Button, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Input,
  Select as ChakraSelect,
  Spinner,
  Flex
} from '@chakra-ui/react'
import { MyFooter } from '../../components/Footer/Footer'
import PatientCard from '../../components/Cards/PatientCard';
import Select from 'react-select';
import {cpf_mask, 
  telefone_mask, 
  cpf_mask_remove, 
  telefone_mask_remove,
  cep_mask_remove
} from '../../components/Forms/form-masks'
import $ from 'jquery'
import 'jquery-mask-plugin'

yup.setLocale({
  string: {
    length: 'deve ter exatamente ${length} caracteres',
    min: 'deve ter pelo menos ${min} caracteres',
    max: 'deve ter no máximo ${max} caracteres',
    email: 'tem o formato de e-mail inválido',
    url: 'deve ter um formato de URL válida',
    trim: 'não deve conter espaços no início ou no fim.',
    lowercase: 'deve estar em maiúsculo',
    uppercase: 'deve estar em minúsculo',
  },
  mixed: {
    default: 'Não é válido',
  },
  number: {
    min: 'Deve ser maior que ${min}',
  },
});

const schema = yup.object({
  nome: yup.string().required('Informe seu nome'),
  telefone: yup.string().required('Informe um telefone valido'),
  cpf: yup.string().length(14).required('Informe um cpf valido'),
  data_nascimento: yup.string().required('Informe uma data de nascimento valida'),
  sexo: yup.string().required('Informe o sexo do paciente'),
  tipo_sanguineo: yup.string().length(3).required('Informe um tipo sanguineo valido'),
  detalhes_clinicos: yup.string(),
  cep: yup.string().required('Informe um CEP valido'),
  logradouro: yup.string().required('Informe um logradouro valido'),
  bairro: yup.string().required('Informe um bairro valido'),
  cidade: yup.string().required('Informe uma cidade valida'),
  numero: yup.string().required('Informe um numero valido'),
  estado: yup.string().required('Informe um estado valido'),
}).required();

const schemaEdit = yup.object({
  nome: yup.string().required('Informe seu nome'),
  telefone: yup.string().required('Informe um telefone valido'),
  cpf: yup.string().length(14).required('Informe um cpf valido'),
  data_nascimento: yup.string().required('Informe uma data de nascimento valida'),
  sexo: yup.string().required('Informe o sexo do paciente'),
  tipo_sanguineo: yup.string().length(3).required('Informe um tipo sanguineo valido'),
  detalhes_clinicos: yup.string(),
  cep: yup.string().required('Informe um CEP valido'),
  logradouro: yup.string().required('Informe um logradouro valido'),
  bairro: yup.string().required('Informe um bairro valido'),
  cidade: yup.string().required('Informe uma cidade valida'),
  numero: yup.string().required('Informe um numero valido'),
  estado: yup.string().required('Informe um estado valido'),
}).required();

export const Pacientes = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
    shouldUnregister: true
  });

  const { register: resgisterEdit, handleSubmit: handleSubmitEdit, formState: { errors: errorsEdit }, setValue } = useForm({
    resolver: yupResolver(schemaEdit)
  });
  const { data: user } = useSelector((state) => state.tokens);

  const history = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const { isOpen: isOpenEdit, onOpen:onOpenEdit, onClose: onCloseEdit } = useDisclosure()
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);


  const [showPassword, setShowPassword] = useState('password')
  const [visible, setVisible] = useState(true)
  const [page, setPage] = useState(1)
  const [selectedState, setSelectedState] = useState(null);
  const [patient, setPatient] = useState(null);
  const [patientsArray, setPatientsArray] = useState([]);
  const [patients, setPatiens] = useState([]);
  const [onCreate, setOnCreate] = useState(false);
  const [searchBy, setSearchBy] = useState('nome');
  const [loadingCadastro, setLoadingCadastro] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [buttonEditColor, setButtonEditColor] = useState('white');
  const [buttonInfoColor, setButtonInfoColor] = useState('white');
  const [pageLoading, setPageLoading] = useState(true);
  const [clinica, setClinica] = useState(null);
  const [clinicas, setClinicas] = useState([]);
  const [clinicasArray, setClinicasArray] = useState([]);

  async function loadPatients() {
    await api.get(`/paciente?id_clinica=${user.data.clinica.id}`).then(({ data }) => {
      setPatientsArray(data)
      setPatiens(data)

    }).catch(({ err }) => {
      console.log(err)
    })
  }

  const loadClinicas = async ()=>{
    if (user.data.clinica) { return }
    await api.get(`/medico/${user.data.id}/clinica`).then(({data})=>{
      console.log(data)
      setClinicas(data.data)
      const clinicasOptions= []
      data.data.map(item=>{
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
    const clinicaFind = clinicas.find(clinica=> clinica.id === clinicaSelecionada.value)
    setClinica(clinicaFind)
  }

  const searchPatient = (search) => {
    console.log(search.target.value)
    if (searchBy === 'nome') {
      var patients = patientsArray.filter(item => item.pessoa.nome.toLowerCase().includes(search.target.value.toLowerCase()))
      setPatiens(patients)
    }
    if (searchBy === 'cpf') {
      var patients = patientsArray.filter(item => item.pessoa.cpf.toLowerCase().includes(search.target.value.toLowerCase()))
      setPatiens(patients)
    }
  }

  useEffect(() => {
    loadClinicas().then(()=>{
      setPageLoading(false)
    })
  }, [])

  useEffect(()=>{
    if(clinica){
      user.data.clinica = clinica
    }

    if (user.data.clinica) {
      setPageLoading(true)
      loadPatients().then(()=>{
        setPageLoading(false)
      })
    }
  },[clinica])

  useEffect(() => {
    if (patient) {
      setValue('nome', patient.pessoa.nome);
      setValue('cpf', patient.pessoa.cpf);
      setValue('estado', patient.estado);
      setValue('sexo', patient.sexo);
      setValue('cep', patient.cep);
      setValue('logradouro', patient.logradouro);
      setValue('numero', patient.numero);
      setValue('tipo_sanguineo', patient.tipo_sanguineo);
      setValue('detalhes_clinicos', patient.detalhes_clinicos);
      setValue('bairro', patient.bairro);
      setValue('cidade', patient.cidade);
      setValue('telefone', patient.pessoa.telefone);
      setValue('data_nascimento', patient.pessoa.data_nascimento);
    }


  }, [patient]);

  const openEdit = (paciente) => {
    setPatient(paciente);
    setIsEditOpen(true);
  }

  const onCloseEdit = () => {
    setPatient(null);
    setIsEditOpen(false);
  }

  const openInfo = (paciente) => {
    if (paciente) {
      setSelectedPatient(paciente)
    }
    setIsInfoOpen(true);
  }

  const closeInfo = () => {
    setSelectedPatient(null);
    setIsInfoOpen(false);
  };

  const onSubmit = async (novopaciente) => {

    novopaciente.cpf = cpf_mask_remove(novopaciente.cpf)
    novopaciente.telefone = telefone_mask_remove(novopaciente.telefone)
    novopaciente.cep = cep_mask_remove(novopaciente.cep)

    novopaciente.tipo_sanguineo = novopaciente.tipo_sanguineo.toUpperCase()

    const pessoa = {
      cpf: novopaciente.cpf,
      data_nascimento: novopaciente.data_nascimento,
      nome: novopaciente.nome,
      telefone: novopaciente.telefone,
      cargo: 'Paciente',
    }

    setLoadingCadastro(true)
    await api.post('/pessoa', pessoa).then(({ data }) => {
      const paciente = {
        id_pessoa: data.data.id,
        id_clinica: clinica.id,
        sexo: novopaciente.sexo,
        tipo_sanguineo: novopaciente.tipo_sanguineo,
        detalhes_clinicos: novopaciente.detalhes_clinicos,
        cep: novopaciente.cep,
        logradouro: novopaciente.logradouro,
        bairro: novopaciente.bairro,
        cidade: novopaciente.cidade,
        numero: novopaciente.numero,
        estado: novopaciente.estado,
      }

      api.post('/paciente', paciente).then(({ data }) => {
        setLoadingCadastro(false)
        onClose()
        loadPatients()
      }).catch(({ }) => {

      })

    }).catch(({ error }) => {
      // alert("Error ao cadastrar")
    })
    // history('/diagnostico')
  };
  const onSubmitEdit = async (editpaciente) => {

    editpaciente.cpf = cpf_mask_remove(editpaciente.cpf)
    editpaciente.telefone = telefone_mask_remove(editpaciente.telefone)
    editpaciente.cep = cep_mask_remove(editpaciente.cep)

    editpaciente.tipo_sanguineo = editpaciente.tipo_sanguineo.toUpperCase()

    const pessoa = {
      cpf: editpaciente.cpf,
      data_nascimento: editpaciente.data_nascimento,
      nome: editpaciente.nome,
      telefone: editpaciente.telefone,
      cargo: 'Paciente',
    }


    await api.put(`/pessoa/${patient.pessoa.id}`, pessoa).then(({ data }) => {
      const paciente = {
        sexo: editpaciente.sexo,
        tipo_sanguineo: editpaciente.tipo_sanguineo,
        detalhes_clinicos: editpaciente.detalhes_clinicos,
        logradouro: editpaciente.logradouro,
        bairro: editpaciente.bairro,
        cidade: editpaciente.cidade,
        numero: editpaciente.numero,
        estado: editpaciente.estado,
      }

      api.put(`/paciente/${patient.id}`, paciente).then(({ data }) => {
        history('/pacientes')
        loadPatients()
        onCloseEdit()
      }).catch(({ }) => {

      })

    }).catch(({ error }) => {
      // alert("Error ao cadastrar")
    })
    // history('/diagnostico')
  };

  const handleChange = (selectedState) => {
    setSelectedState(selectedState);
  };

  const changeButtonContent = (setFunction, mouseEvent) => {
    mouseEvent === 'out' ? setFunction('white') : setFunction('#3B83C3')
  }

  const states = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' },
  ];

  $(() => {
    $('#FormControlInputCPF').mask('000.000.000-00')
    $('#FormControlInputTel').mask('(00) 0 0000-0000')
    $('#FormControlInputCEP').mask('00000-000')
    $('#FormControlInputTipoSanguineo').mask('AA0', {
      translation: {
        'A': { pattern: /[ABOabo]/ },
        '0': { pattern: /[+-]/ }
      }
    })
  })

  return (
    <main style={{ backgroundColor: '#F8F8FF' }}>
      <header><NavbarComp showEntrarButton={true} /></header>
      {pageLoading ? <Flex justifyContent='center' alignItems='center' w='100vw' h='80vh'>
        <Spinner emptyColor='gray.200' thickness='5px' color='#3b83c3' size='xl' />
      </Flex>
        :
        !user.data.clinica ? 
        <Box  m='2rem 0' mb='4rem' display='flex' flexDirection='column' alignItems='center' justifyContent='flex-start' mt='4rem' height='80vh' >
          <Box w='80%'>
          <Text lineHeight='0.2rem' fontWeight='bold'>SELECIONE A CLINICA</Text>
            <Select
            
              value={clinica}
              onChange={handleClinica}
              options={clinicasArray}
              isSearchable
              placeholder="Digite para buscar..."
            />
          </Box>
        </Box> : 
        <Box m='2rem 0' mb='4rem' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
          <Box display='flex' w='90%' >
            <ChakraSelect onChange={(e) => setSearchBy(e.target.value)} w='20%' ml='10%' icon={<GiSettingsKnobs />} mr='1rem' bg={'white'}>
              <option value='nome'>Nome</option>
              <option value='cpf'>CPF</option>
            </ChakraSelect>
            <Input placeholder='Procurar paciente' mr='0.5rem' onChange={searchPatient} bg={'white'} />
            <Button colorScheme='blue' alignSelf='flex-end' w='20%' mr='10%' onClick={onOpen} >Cadastrar Paciente</Button>
          </Box>

       

            <Box m='2rem 0' w='100%' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>

              <Box
                w='80%'
                h='80%'
              >
                {patients.map(paciente => (
                  <PatientCard paciente={paciente} openEdit={openEdit} openInfo={openInfo} />
                ))}

              </Box>
            </Box>
          </Box> 
          
        }
      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cadastrar Paciente</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className="custom-formcomp">

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputNome">Nome*</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputNome"
                    placeholder="Digite seu nome completo*"
                    {...register("nome")}
                  />
                  <div className={errors.nome ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.nome?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputCPF">CPF*</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputCPF"
                    placeholder="000.000.000-00"
                    {...register("cpf")}
                  />
                  <div className={errors.cpf ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.cpf?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputData">Data de Nascimento*</label>
                  <input
                    type="date"
                    className="form-control formcomp-input"
                    id="FormControlInputData"
                    placeholder="DD/MM/AAAA"
                    {...register("data_nascimento")}
                  />
                  <div className={errors.data_nascimento ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.data_nascimento?.message}</p>
                  </div>

                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputTel"> Telefone*</label>
                  <input
                    type="tel"
                    className="form-control formcomp-input"
                    id="FormControlInputTel"
                    placeholder="(99) 9 9999-9999"
                    {...register("telefone")}
                    title="Digite apenas números"
                  />
                  <div className={errors.telefone ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.telefone?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="FormControlSexo">Sexo*</label>
                  <select
                    className="form-control formcomp-input"
                    id="FormControlSexo"
                    {...register("sexo")}
                  >
                    <option value="" disabled selected>
                      Escolha um dos itens listados
                    </option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                  <div className={errors.sexo ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.sexo?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputTipoSanguineo">Tipo sanguíneo*</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputTipoSanguineo"
                    placeholder="Ex: AA+"
                    {...register("tipo_sanguineo")}
                  />
                  <div className={errors.tipo_sanguineo ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.tipo_sanguineo?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputDetalhes">Detalhes clinicos</label>
                  <Textarea
                    resize='vertical'
                    w='80%'
                    height='5rem'
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputDetalhes"
                    placeholder="Informações adicionais do paciente"
                    {...register("detalhes_clinicos")}
                  />
                  <div className={errors.detalhes_clinicos ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.detalhes_clinicos?.message}</p>
                  </div>

                </div>
                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputCEP">CEP*</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputCEP"
                    placeholder=""
                    {...register("cep")}
                  />
                  <div className={errors.cep ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.cep?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputLogradouro">Logradouro*</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputLogradouro"
                    placeholder=""
                    {...register("logradouro")}
                  />
                  <div className={errors.logradouro ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.logradouro?.message}</p>
                  </div>
                </div>
                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputBairro">Bairro*</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputBairro"
                    placeholder=""
                    {...register("bairro")}
                  />
                  <div className={errors.bairro ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.bairro?.message}</p>
                  </div>
                </div>
                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputCidade">Cidade*</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputCidade"
                    placeholder=""
                    {...register("cidade")}
                  />
                  <div className={errors.cidade ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.cidade?.message}</p>
                  </div>
                </div>
                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputNumero">Numero*</label>
                  <input
                    type="number"
                    className="form-control formcomp-input"
                    id="FormControlInputNumero"
                    placeholder=""
                    {...register("numero")}
                  />
                  <div className={errors.numero ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.numero?.message}</p>
                  </div>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="FormControlEstado">Estado*</label>
                  <select
                    className="form-control formcomp-input"
                    id="FormControlEstado"
                    {...register("estado")}
                  >
                    <option value="" disabled selected>
                      Escolha um dos itens listados
                    </option>
                    {
                      states.map((item) => (
                        <option value={item.value}>{item.label}</option>
                      ))
                    }
                  </select>
                  <div className={errors.estado ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.estado?.message}</p>
                  </div>
                </div>
                {/* <input type="submit" className="inputbtn btn btn-primary custom-btn" value="Cadastrar" /> */}
                <Button type="submit" colorScheme='blue' isLoading={loadingCadastro} className="inputbtn btn btn-primary custom-btn" >Cadastrar</Button>
              </form>
            </ModalBody>

          </ModalContent>
        </Modal>

        <Modal isOpen={isEditOpen} onClose={onCloseEdit} size={'lg'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Informações</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmitEdit(onSubmitEdit)} className="custom-formcomp" style={{paddingBottom: '1rem'}}>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputNome">Nome</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputNome"
                    placeholder="Digite seu nome completo"
                    {...resgisterEdit("nome")}



                  />
                  <div className={errorsEdit.nome ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.nome?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputCPF">CPF</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputCPF"
                    placeholder="000.000.000-00"
                    {...resgisterEdit("cpf")}
                  />
                  <div className={errorsEdit.cpf ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.cpf?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputData">Data de Nascimento</label>
                  <input
                    type="date"
                    className="form-control formcomp-input"
                    id="FormControlInputData"
                    placeholder="Digite sua data de nascimento"
                    {...resgisterEdit("data_nascimento")}
                  />
                  <div className={errorsEdit.data_nascimento ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.data_nascimento?.message}</p>
                  </div>

                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputTel"> Telefone</label>
                  <input
                    type="tel"
                    className="form-control formcomp-input"
                    id="FormControlInputTel"
                    placeholder="(99) 9 9999-9999"
                    {...resgisterEdit("telefone")}
                    title="Digite apenas números"
                  />
                  <div className={errorsEdit.telefone ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.telefone?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="FormControlSexo">Sexo</label>
                  <select
                    className="form-control formcomp-input"
                    id="FormControlSexo"
                    {...resgisterEdit("sexo")}
                  >
                    <option value="" disabled selected>
                      Escolha um dos itens listados
                    </option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                  <div className={errorsEdit.sexo ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.sexo?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputTipoSanguineo">Tipo sanguíneo</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputTipoSanguineo"
                    placeholder="Ex: A+"
                    {...resgisterEdit("tipo_sanguineo")}
                  />
                  <div className={errorsEdit.tipo_sanguineo ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.tipo_sanguineo?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputDetalhes">Detalhes clinicos</label>
                  <Textarea
                    resize='vertical'
                    w='80%'
                    height='5rem'
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputDetalhes"
                    placeholder="Informe os detalhes aqui"
                    {...resgisterEdit("detalhes_clinicos")}
                  />
                  <div className={errorsEdit.detalhes_clinicos ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.detalhes_clinicos?.message}</p>
                  </div>

                </div>
                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputCEP">CEP</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputCEP"
                    placeholder=""
                    {...resgisterEdit("cep")}
                  />
                  <div className={errorsEdit.cep ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.cep?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputLogradouro">Logradouro</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputLogradouro"
                    placeholder=""
                    {...resgisterEdit("logradouro")}
                  />
                  <div className={errorsEdit.logradouro ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.logradouro?.message}</p>
                  </div>
                </div>
                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputBairro">Bairro</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputBairro"
                    placeholder=""
                    {...resgisterEdit("bairro")}
                  />
                  <div className={errorsEdit.bairro ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.bairro?.message}</p>
                  </div>
                </div>
                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputCidade">Cidade</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputCidade"
                    placeholder=""
                    {...resgisterEdit("cidade")}
                  />
                  <div className={errorsEdit.cidade ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.cidade?.message}</p>
                  </div>
                </div>
                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputNumero">Numero</label>
                  <input
                    type="number"
                    className="form-control formcomp-input"
                    id="FormControlInputNumero"
                    placeholder=""
                    {...resgisterEdit("numero")}
                  />
                  <div className={errorsEdit.numero ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.numero?.message}</p>
                  </div>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="FormControlEstado">Estado</label>
                  <select
                    className="form-control formcomp-input"
                    id="FormControlEstado"
                    {...resgisterEdit("estado")}
                  >
                    <option value="" disabled selected>
                      Escolha um dos itens listados
                    </option>
                    {
                      states.map((item) => (
                        <option value={item.value}>{item.label}</option>
                      ))
                    }
                  </select>
                  <div className={errorsEdit.estado ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.estado?.message}</p>
                  </div>
                </div>

                <Button type="submit" colorScheme='blue' isLoading={loadingCadastro} mt='0.8rem' >Editar</Button>

              </form>
            </ModalBody>

          </ModalContent>
        </Modal>
        <Modal isOpen={isInfoOpen} onClose={closeInfo}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Informações do Paciente</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Name: {selectedPatient?.pessoa.nome}</Text>
              <Text>CPF: {cpf_mask(selectedPatient?.pessoa.cpf)}</Text>
              <Text>Telefone: {telefone_mask(selectedPatient?.pessoa.telefone)}</Text>
              <Text>Rua: {selectedPatient?.logradouro}</Text>
              <Text>Bairro: {selectedPatient?.bairro}</Text>
              <Text>Número: {selectedPatient?.numero}</Text>
              <Text>Cidade: {selectedPatient?.cidade}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>

      <div>
        <MyFooter />
      </div>
    </main>
  )
}
