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
import { Button, useToast} from '@chakra-ui/react';


const schema = yup.object({
  nome: yup.string().required('Informe seu nome'),
  cnpj: yup.string().required('Informe um CRM válido'),
  email: yup.string().required('Informe um email válido'),
  senha: yup.string().min(8, 'A senha deve conter 8 caracteres').required('Digite uma senha'),
  confirmarSenha: yup.string().required('Digite sua senha novamente').oneOf([yup.ref("senha")], 'As senhas devem ser iguais')
}).required();

export const FormCadastroClinica = ({reLoadClinicas}) => {

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema)
  });

  const toast = useToast();

  const [onLoading, setOnLoading] = useState(false);
  const [showPassword, setShowPassword] = useState('password')
  const [visible, setVisible] = useState(true)

  const onSubmit = async (user) => {

    const clinica = {
      cnpj: user.cnpj,
      email: user.email,
      nome: user.nome,
      senha: user.senha,
    }
    await toast.promise(
      apiUnAuth.post('/clinica', clinica).then(({ data }) => {
      reLoadClinicas()
    }).catch(({ error }) => {
      throw error;
    }),
    {
      loading: { title: 'Cadastro em andamento.', description: 'Por favor, aguarde.' },
      success: { title: 'Cadastro realizado com sucesso!', description: 'Seja bem-vindo!', duration: 500},
      error: { title: 'Erro ao cadastrar usuário.', description: 'Por favor, tente novamente.', duration: 6000, isClosable: true},
    }
    );
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
            placeholder="Digite o nome da sua clínica"
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
            placeholder="Insira o CNPJ"
            {...register("cnpj")}
          />
          <div className={errors.cnpj ? 'showerror errorDiv' : 'hideerror errorDiv'}>
            <AiOutlineInfoCircle />
            <p>{errors.cnpj?.message}</p>
          </div>
        </div>

        <div className="form-group mt-2 ">
          <label htmlFor="FormControlInputCPF">Email</label>
          <input
            type="text"
            className="form-control formcomp-input"
            id="FormControlInputCPF"
            placeholder="Insira um Email"
            {...register("email")}
          />
          <div className={errors.email ? 'showerror errorDiv' : 'hideerror errorDiv'}>
            <AiOutlineInfoCircle />
            <p>{errors.email?.message}</p>
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
    </>
  );
};
