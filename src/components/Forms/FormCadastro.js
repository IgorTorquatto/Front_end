import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FormCadastro.css';

import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineInfoCircle } from 'react-icons/ai';
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loadSession } from '../../store/ducks/tokens/actions.ts';
import { api, apiUnAuth } from  '../../services/api.ts'
import { useDispatch,useSelector } from 'react-redux';
import { Button } from '@chakra-ui/react';
import { useHistorico } from '../../hooks/useHistorico';

const schema = yup.object({
  nome: yup.string().required('Informe seu nome'),
  email: yup.string().email('Informe um email valido').required('Informe um email valido'),
  telefone: yup.string().required('Informe um telefone valido'),
  cpf: yup.string().required('Informe um cpf valido'),
  data_nascimento: yup.string().required('Informe uma data de nascimento valida'),
  crm: yup.string().required('Informe um crm valido'),
  especialidade: yup.string().required('Informe uma especialidade valida'),
  senha: yup.string().min(8, 'a senha deve conter 8 caracteres').required('Digite uma senha'),
  confirmarSenha: yup.string().required('Digite sua senha novamente').oneOf([yup.ref("senha")], 'As senhas devem ser iguais')
}).required();

export const FormCadastro = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema)
  });

  const history = useNavigate()
  const dispactch = useDispatch();

  const [onLoading, setOnLoading] = useState(false);
  const [showPassword, setShowPassword] = useState('password')
  const [visible, setVisible] = useState(true)
  const { data: user } = useSelector((state) => state.tokens);
  const { handleHistorico } = useHistorico()
  const onSubmit = async (novoMedico) => {
   
    const pessoa = {
      cpf: novoMedico.cpf,
      data_nascimento: novoMedico.data_nascimento,
      nome: novoMedico.nome,
      telefone: novoMedico.telefone,
      cargo: 'Médico',
    }
    await apiUnAuth.post('/pessoa', pessoa).then(({ data }) => {
      const medico = {
        id_pessoa: data.data.id,
        crm: novoMedico.crm,
        especialidade: novoMedico.especialidade,
        senha: novoMedico.senha,
        email: novoMedico.email
      }

      apiUnAuth.post(`/clinica/${user.data.id}/medico`, medico).then(({ data }) => {
       console.log(data)
       handleHistorico(null)
      }).catch(({})=>{

      })

    }).catch(({ error }) => {
      // alert("Error ao cadastrar")
    })
  };

  function visibleIcon() {
    if (visible) {
      return (
        <AiOutlineEye size={24} color='#000000' />
      )
    } else {
      return <AiOutlineEyeInvisible size={24} color='#000000' />
    }

  }

  function showPassord() {
    if (showPassword === 'password') {
      setShowPassword('text')
      setVisible(false)
    } else {
      setShowPassword('password')
      setVisible(true)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="custom-formcomp">
        <div className="form-group mt-2 ">
          <label htmlFor="FormControlInputNome">Nome: </label>
          <input
            type="text"
            className="form-control formcomp-input"
            id="FormControlInputNome"
            placeholder="Digite o nome do médico"
            {...register("nome")}
          />
          <div className={errors.nome ? 'showerror errorDiv' : 'hideerror errorDiv'}>
            <AiOutlineInfoCircle />
            <p>{errors.nome?.message}</p>
          </div>
        </div>

        <div className="form-group mt-2 ">
          <label htmlFor="FormControlInputEmail">Endereço de email: </label>
          <input
            type="email"
            className="form-control formcomp-input"
            id="FormControlInputEmail"
            {...register("email")}
            placeholder="Insira um endereço de email válido"
          />
          <div className={errors.email ? 'showerror errorDiv' : 'hideerror errorDiv'}>
            <AiOutlineInfoCircle />
            <p>{errors.email?.message}</p>
          </div>
        </div>
        <div className="form-group mt-2 ">
          <label htmlFor="FormControlInputCPF">CPF: </label>
          <input
            type="text"
            className="form-control formcomp-input"
            id="FormControlInputCPF"
            placeholder="Insira o CPF do médico"
            {...register("cpf")}
          />
          <div className={errors.cpf ? 'showerror errorDiv' : 'hideerror errorDiv'}>
            <AiOutlineInfoCircle />
            <p>{errors.cpf?.message}</p>
          </div>
        </div>
        <div className="form-group mt-2 ">
          <label htmlFor="FormControlInputCRM">CRM: </label>
          <input
            type="text"
            className="form-control formcomp-input"
            id="FormControlInputCRM"
            placeholder="Insira o CRM do médico"
            {...register("crm")}
          />
          <div className={errors.crm ? 'showerror errorDiv' : 'hideerror errorDiv'}>
            <AiOutlineInfoCircle />
            <p>{errors.crm?.message}</p>
          </div>
        </div>
        <div className="form-group mt-2 ">
          <label htmlFor="FormControlInputData">Data de Nascimento: </label>
          <input
            type="date"
            className="form-control formcomp-input"
            id="FormControlInputData"
            placeholder="Insira a data de nascimento do médico"
            {...register("data_nascimento")}
          />
          <div className={errors.data_nascimento ? 'showerror errorDiv' : 'hideerror errorDiv'}>
            <AiOutlineInfoCircle />
            <p>{errors.data_nascimento?.message}</p>
          </div>

        </div>

        <div className="form-group mt-2 ">
          <label htmlFor="FormControlInputTel">Telefone: </label>
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
          <label htmlFor="FormControlInputEsp">Especialização: </label>
          <select
            className="form-control formcomp-input"
            id="FormControlInputEsp"
            {...register("especialidade")}
          >
            <option value="" disabled selected>
              Escolha um dos itens listados
            </option>
            <option value="adasd">Opção 1</option>
            <option value="2">Opção 2</option>
            <option value="3">Opção 3</option>
            <option value="4">Opção 4</option>
            <option value="5">Opção 5</option>
          </select>
          <div className={errors.especialidade ? 'showerror errorDiv' : 'hideerror errorDiv'}>
            <AiOutlineInfoCircle />
            <p>{errors.especialidade?.message}</p>
          </div>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="FormControlInputSenha">Senha: </label>
          <input
            type="password"
            className="form-control formcomp-input"
            id="FormControlInputSenha"
            placeholder="Insira uma senha para o login médico"
            {...register("senha")}
          />
          <div className={errors.senha ? 'showerror errorDiv' : 'hideerror errorDiv'}>
            <AiOutlineInfoCircle />
            <p>{errors.senha?.message}</p>
          </div>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="FormControlInputConfirmarSenha">Confirmar senha: </label>
          <input
            type="password"
            className="form-control formcomp-input"
            id="FormControlInputConfirmarSenha"
            placeholder="Informe a senha novamente"
            {...register("confirmarSenha")}
          />
          <div className={errors.confirmarSenha ? 'showerror errorDiv' : 'hideerror errorDiv'}>
            <AiOutlineInfoCircle />
            <p>{errors.confirmarSenha?.message}</p>
          </div>
        </div>

        <Button
          type="submit"
          colorScheme='blue'
          w='80%'
          className="inputbtn"
          isLoading={onLoading}
        >Cadastrar</Button>
      </form>

      {/*<div className="form-cadastro-text mt-3">
        <p className="cadastro-login-link">
          Já possui conta? <Link to="/login">Entrar agora</Link>
        </p>
       </div>*/}
    </>
  );
};
