import React from 'react'
import { NavbarComp } from '../../components/Header/NavbarComp'
import { Link, useNavigate } from 'react-router-dom';
import './Pacientes.css'

import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineInfoCircle } from 'react-icons/ai';
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loadSession } from '../../store/ducks/tokens/actions.ts';
import { api } from  '../../services/api.ts'
import { useDispatch } from 'react-redux';
import { Box, Textarea } from '@chakra-ui/react'
import Select from 'react-select';

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
export const Pacientes = () => {
  
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema)
  });

  const history = useNavigate()
  const dispactch = useDispatch();

  const [showPassword, setShowPassword] = useState('password')
  const [visible, setVisible] = useState(true)
  const [page, setPage] = useState(1)
  const [selectedState, setSelectedState] = useState(null);

  const onSubmit = async (user) => {
   
    const pessoa = {
      cpf: user.cpf,
      data_nascimento: user.data_nascimento,
      nome: user.nome,
      telefone: user.telefone,
      cargo: 'Paciente',
    }

   
    await api.post('/pessoa', pessoa).then(({ data }) => {
      const paciente = {
        id_pessoa: data.data.id,
        sexo: user.sexo,
        tipo_sanguineo: user.tipo_sanguineo,
        detalhes_clinicos: user.detalhes_clinicos,
        logradouro: user.logradouro,
        bairro: user.bairro,
        cidade: user.cidade,
        numero: user.numero,
        estado: user.estado,
      }

      api.post('/paciente', paciente).then(({ data }) => {
        // dispactch(loadSession(data))
      }).catch(({})=>{

      })

    }).catch(({ error }) => {
      // alert("Error ao cadastrar")
    })
    history('/diagnostico')
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
    <header><NavbarComp showEntrarButton={true}/></header>
    <Box m='2rem 0' display='flex'  alignItems='center' justifyContent='center'>
    <Box 
    w='80%'
    h='80%'
  boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}
  padding='2rem 0'
  borderRadius='1.5rem'>
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
              states.map((item)=>(
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
    </Box>
    </Box>
    
   
      
    </main>
  )
}
