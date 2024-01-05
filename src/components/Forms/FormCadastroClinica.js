import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FormCadastroClinica.css';

import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineInfoCircle } from 'react-icons/ai';
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loadSession } from '../../store/ducks/tokens/actions';
import { api, apiUnAuth } from '../../services/api'
import { useDispatch } from 'react-redux';
import { Button } from '@chakra-ui/react';


const schema = yup.object({
  nome: yup.string().required('Informe seu nome'),
  cnpj: yup.string().required('Informe um crm valido'),
  senha: yup.string().min(8, 'a senha deve conter 8 caracteres').required('Digite uma senha'),
  confirmarSenha: yup.string().required('Digite sua senha novamente').oneOf([yup.ref("senha")], 'As senhas devem ser iguais')
}).required();

export const FormCadastroClinica = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema)
  });

  const history = useNavigate()
  const dispactch = useDispatch();

  const [onLoading, setOnLoading] = useState(false);
  const [showPassword, setShowPassword] = useState('password')
  const [visible, setVisible] = useState(true)

  const onSubmit = async (user) => {

    const clinica = {
      cnpj: user.cnpj,
      nome: user.nome,
      senha: user.senha,
    }
    await apiUnAuth.post('/clinica', clinica).then(({ data }) => {
      const login = {
        cnpj: user.cnpj,
        senha: user.senha,
      }
      dispactch(loadSession(login))
      history('/clinica')
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
      <form onSubmit={handleSubmit(onSubmit)} className="custom-formcomp mt-4">
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
          <label htmlFor="FormControlInputCPF">CNPJ</label>
          <input
            type="text"
            className="form-control formcomp-input"
            id="FormControlInputCPF"
            placeholder="Digite seu nome completo"
            {...register("cnpj")}
          />
          <div className={errors.cnpj ? 'showerror errorDiv' : 'hideerror errorDiv'}>
            <AiOutlineInfoCircle />
            <p>{errors.cnpj?.message}</p>
          </div>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="FormControlInputSenha">Senha</label>
          <input
            type="password"
            className="form-control formcomp-input"
            id="FormControlInputSenha"
            placeholder="Informe sua senha"
            {...register("senha")}
          />
          <div className={errors.senha ? 'showerror errorDiv' : 'hideerror errorDiv'}>
            <AiOutlineInfoCircle />
            <p>{errors.senha?.message}</p>
          </div>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="FormControlInputConfirmarSenha">Confirmar senha</label>
          <input
            type="password"
            className="form-control formcomp-input"
            id="FormControlInputConfirmarSenha"
            placeholder="Informe sua senha novamente"
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

      <div className="form-cadastro-text mt-3">
        <p className="cadastro-login-link">
          Já possui conta? <Link to="/login">Entrar agora</Link>
        </p>
      </div>
    </>
  );
};
