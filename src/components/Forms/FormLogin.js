import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./FormLogin.css";

import { useState } from "react";
import {
  // AiOutlineEye,
  // AiOutlineEyeInvisible,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import * as yup from "yup";
import { useForm/*, SubmitHandler*/ } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loadSession } from "../../store/ducks/tokens/actions.ts";
//import { api } from "../../services/api.ts";
import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";

const schema = yup
  .object({
    data: yup
      .string()
      .required("Informe um email ou cnpj valido"),
    senha: yup
      .string()
      .min(8, "a senha deve conter 8 caracteres")
      .required("Digite uma senha"),
  })
  .required();

export const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [onLoading, setOnLoading] = useState(false);

  const history = useNavigate();
  const dispactch = useDispatch();

  //const [showPassword, setShowPassword] = useState("password");
  //const [visible, setVisible] = useState(true);

  function validarEmail(texto) {
    var padraoEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return padraoEmail.test(texto);
  }

  function validarNumeros(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
  }
  

  const onSubmit = async (user) => {

    // setOnLoading(true)
    try {
      if(validarNumeros(user.data)){
        const login = {
          email: null,
          username: null,
          cnpj: user.data,
          senha: user.senha
        }
        dispactch(loadSession(login))
      }
      else if (validarEmail(user.data)) {
        const login = {
          email: user.data,
          cnpj: null,
          username: null,
          senha: user.senha
        }
        dispactch(loadSession(login))
      } else {
        const login = {
          email: null,
          cnpj: null,
          username: user.data,
          senha: user.senha
        }
        dispactch(loadSession(login))
      }
    } catch { }
  };



  return (
    <>
      <form className="custom-formcomp" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mt-2 ">
          <label htmlFor="exampleFormControl1">Endereço de email ou CNPJ</label>
          <input
            type="text"
            className="form-control formcomp-input"
            id="exampleFormControl1"
            placeholder="Insira o e-mail ou CNPJ"
            {...register("data")}
          />
          <div
            className={
              errors.data ? "showerror errorDiv" : "hideerror errorDiv"
            }
          >
            <AiOutlineInfoCircle />
            <p>{errors.data?.message}</p>
          </div>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="exampleFormControl2">Senha</label>
          <input
            type="password"
            className="form-control formcomp-input"
            id="exampleFormControl2"
            placeholder="Informe sua senha"
            {...register("senha")}
          />
          <div
            className={
              errors.senha ? "showerror errorDiv" : "hideerror errorDiv"
            }
          >
            <AiOutlineInfoCircle />
            <p>{errors.senha?.message}</p>
          </div>
        </div>

        <p className="login-forget-password mt-3">
          <Link to="/">Esqueceu sua senha?</Link>
        </p>
        <Button
          type="submit"
          colorScheme='blue'
          w='80%'
          alignSelf='center'
          mb='1rem'
          isLoading={onLoading}
        >Entrar</Button>
      </form>

      <div className="form-login-text">
        <p className="login-register-now">
          Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se agora</Link>
        </p>
      </div>
    </>
  );
};
