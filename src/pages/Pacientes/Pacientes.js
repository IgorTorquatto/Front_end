import React from 'react'
import { NavbarComp } from '../../components/Header/NavbarComp'
import { Link, useNavigate } from 'react-router-dom';
import './Pacientes.css'

import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineInfoCircle } from 'react-icons/ai';
import { CiEdit } from "react-icons/ci";
import { GiSettingsKnobs } from "react-icons/gi";
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loadSession } from '../../store/ducks/tokens/actions.ts';
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
  Select
} from '@chakra-ui/react'
import { Container } from 'react-bootstrap';

const schema = yup.object({
  nome: yup.string().required('Informe seu nome'),
  telefone: yup.string().required('Informe um telefone valido'),
  cpf: yup.string().required('Informe um cpf valido'),
  data_nascimento: yup.string().required('Informe uma data de nascimento valida'),
  sexo: yup.string().required('Informe um sexo valido'),
  tipo_sanguineo: yup.string().required('Informe um tipo sanguineo valido'),
  detalhes_clinicos: yup.string(),
  logradouro: yup.string().required('Informe um logradouro valido'),
  bairro: yup.string().required('Informe um bairro valido'),
  cidade: yup.string().required('Informe um cidade valido'),
  numero: yup.string().required('Informe um numero valido'),
  estado: yup.string().required('Informe um estado valido'),
}).required();

const schemaEdit = yup.object({
  nome: yup.string().required('Informe seu nome'),
  telefone: yup.string().required('Informe um telefone valido'),
  cpf: yup.string().required('Informe um cpf valido'),
  data_nascimento: yup.string().required('Informe uma data de nascimento valida'),
  sexo: yup.string().required('Informe um sexo valido'),
  tipo_sanguineo: yup.string().required('Informe um tipo sanguineo valido'),
  detalhes_clinicos: yup.string(),
  logradouro: yup.string().required('Informe um logradouro valido'),
  bairro: yup.string().required('Informe um bairro valido'),
  cidade: yup.string().required('Informe um cidade valido'),
  numero: yup.string().required('Informe um numero valido'),
  estado: yup.string().required('Informe um estado valido'),
}).required();
export const Pacientes = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema)
  });

  const { register: resgisterEdit, handleSubmit: handleSubmitEdit, formState: { errors: errorsEdit }, setValue } = useForm({
    resolver: yupResolver(schemaEdit)
  });
  const { data: user } = useSelector((state) => state.tokens);

  const history = useNavigate()
  const dispactch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()

  const [showPassword, setShowPassword] = useState('password')
  const [visible, setVisible] = useState(true)
  const [page, setPage] = useState(1)
  const [selectedState, setSelectedState] = useState(null);
  const [patient, setPatient] = useState(null);
  const [patientsArray, setPatientsArray] = useState([]);
  const [patients, setPatiens] = useState([]);
  const [onCreate, setOnCreate] = useState(false);
  const [searchBy, setSearchBy] = useState('nome');

  async function loadPatients() {
    await api.get(`/paciente?id_medico=${user.data.id}`).then(({ data }) => {
      setPatientsArray(data)
      setPatiens(data)

    }).catch(({ err }) => {
      console.log(err)
    })
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
    loadPatients()
  }, [])

  useEffect(() => {
    if (patient) {
      setValue('nome', patient.pessoa.nome);
      setValue('cpf', patient.pessoa.cpf);
      setValue('estado', patient.estado);
      setValue('sexo', patient.sexo);
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
    setPatient(paciente)
    onOpenEdit()
  }

  const onSubmit = async (novopaciente) => {

    const pessoa = {
      cpf: novopaciente.cpf,
      data_nascimento: novopaciente.data_nascimento,
      nome: novopaciente.nome,
      telefone: novopaciente.telefone,
      cargo: 'Paciente',
    }


    await api.post('/pessoa', pessoa).then(({ data }) => {
      const paciente = {
        id_pessoa: data.data.id,
        id_medico: user.data.id,
        sexo: novopaciente.sexo,
        tipo_sanguineo: novopaciente.tipo_sanguineo,
        detalhes_clinicos: novopaciente.detalhes_clinicos,
        logradouro: novopaciente.logradouro,
        bairro: novopaciente.bairro,
        cidade: novopaciente.cidade,
        numero: novopaciente.numero,
        estado: novopaciente.estado,
      }
      console.log(paciente)

      api.post('/paciente', paciente).then(({ data }) => {
        history('/pacientes')
      }).catch(({ }) => {

      })

    }).catch(({ error }) => {
      // alert("Error ao cadastrar")
    })
    // history('/diagnostico')
  };
  const onSubmitEdit = async (editpaciente) => {

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
      console.log(paciente)

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

  return (
    <main>
      <header><NavbarComp showEntrarButton={true} /></header>
      <Box m='2rem 0' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        <Box display='flex' w='100%' >
          <Select onChange={(e)=>setSearchBy(e.target.value)} w='20%'  ml='10%' icon={<GiSettingsKnobs/>}>
            <option value='nome'>Nome</option>
            <option value='cpf'>CPF</option>
          </Select>
          <Input placeholder='Procurar paciente'  mr='0.5rem' onChange={searchPatient} />
          <Button colorScheme='blue' alignSelf='flex-end' w='20%' mr='10%' onClick={onOpen} >Cadastrar Paciente</Button>
        </Box>

        <Box
          w='80%'
          h='80%'
        >
          {patients.map(paciente => (
            <Box color='white' className='patientBox'  padding='1rem 2rem' borderRadius='1rem' margin='1rem 0' display='flex' justifyContent='space-between' alignItems='center' background='#3b83c3'>
              <Box display='flex' padding='1rem' w='100%'>
                <Box mr='20%'>
                  <Text>Paciente: {paciente.pessoa.nome}</Text>
                  <Text>CPF: {paciente.pessoa.cpf}</Text>
                </Box>

                <Box>
                  <Text>Telefone: {paciente.pessoa.telefone}</Text>
                  <Text>Sexo: {paciente.sexo}</Text>
                </Box>
              </Box>


              <Button leftIcon={<CiEdit />} onClick={() => { openEdit(paciente) }} colorScheme='orange' variant='solid'>
                Editar
              </Button>
            </Box>
          ))}


        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cadastrar Paciente</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className="custom-formcomp">

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputNome">Nome</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputNome"
                    placeholder="Digite seu nome completo"
                    {...register("nome")}
                  />
                  <div className={errors.nome ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.nome?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputCPF">CPF</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputCPF"
                    placeholder="Digite seu nome completo"
                    {...register("cpf")}
                  />
                  <div className={errors.cpf ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.cpf?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputData">Data de Nascimento</label>
                  <input
                    type="date"
                    className="form-control formcomp-input"
                    id="FormControlInputData"
                    placeholder="Digite seu nome completo"
                    {...register("data_nascimento")}
                  />
                  <div className={errors.data_nascimento ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.data_nascimento?.message}</p>
                  </div>

                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputTel"> Telefone</label>
                  <input
                    type="tel"
                    className="form-control formcomp-input"
                    id="FormControlInputTel"
                    placeholder="(99) 9 9999-9999"
                    pattern="[0-9]*"
                    {...register("telefone")}
                    title="Digite apenas números"
                  />
                  <div className={errors.telefone ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.telefone?.message}</p>
                  </div>
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="FormControlSexo">Sexo</label>
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
                  <label htmlFor="FormControlInputTipoSanguineo">Tipo sanguíneo</label>
                  <input
                    type="text"
                    className="form-control formcomp-input"
                    id="FormControlInputTipoSanguineo"
                    placeholder="Digite seu nome completo"
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
                    placeholder="Digite seu nome completo"
                    {...register("detalhes_clinicos")}
                  />
                  <div className={errors.detalhes_clinicos ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errors.detalhes_clinicos?.message}</p>
                  </div>

                </div>

                <div className="form-group mt-2 ">
                  <label htmlFor="FormControlInputLogradouro">Logradouro</label>
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
                  <label htmlFor="FormControlInputBairro">Bairro</label>
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
                  <label htmlFor="FormControlInputCidade">Cidade</label>
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
                  <label htmlFor="FormControlInputNumero">Numero</label>
                  <input
                    type="text"
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
                  <label htmlFor="FormControlEstado">Estado</label>
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
                <input type="submit" className="inputbtn btn btn-primary custom-btn" value="Cadastrar" />

              </form>
            </ModalBody>

          </ModalContent>
        </Modal>

        <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmitEdit(onSubmitEdit)} className="custom-formcomp">

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
                    placeholder="Digite seu nome completo"
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
                    placeholder="Digite seu nome completo"
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
                    pattern="[0-9]*"
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
                    placeholder="Digite seu nome completo"
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
                    placeholder="Digite seu nome completo"
                    {...resgisterEdit("detalhes_clinicos")}
                  />
                  <div className={errorsEdit.detalhes_clinicos ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                    <AiOutlineInfoCircle />
                    <p>{errorsEdit.detalhes_clinicos?.message}</p>
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
                    type="text"
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
                <input type="submit" className="inputbtn btn btn-primary custom-btn" value="Cadastrar" />

              </form>
            </ModalBody>

          </ModalContent>
        </Modal>
      </Box>



    </main>
  )
}
