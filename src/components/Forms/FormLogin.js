import React from "react";
import { Link } from "react-router-dom";
import "./FormLogin.css";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loadSession } from "../../store/ducks/tokens/actions.ts";
import { useDispatch, useSelector } from "react-redux";
import { Button, useToast } from "@chakra-ui/react";
import { apiUnAuth } from "../../services/api";

const schema = yup
  .object({
    data: yup
      .string()
      .required("Informe um E-mail ou CNPJ válido"),
    senha: yup
      .string()
      .min(8, "A senha deve conter 8 caracteres")
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
  const dispactch = useDispatch();
  const toast = useToast()

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

    setOnLoading(true)
    try {


      if (validarEmail(user.data)) {
        const login = {
          username: null,
          email: user.data,
          senha: user.senha
        }

        toast.promise(
          apiUnAuth.post('/login', login).then(({ data }) => {
            dispactch(loadSession(data))
          }).catch((error) => {
            setOnLoading(false);
            throw error;
          }),
          {
            loading: { title: 'Login em andamento.', description: 'Por favor, aguarde.' },
            success: { title: 'Login realizado com sucesso!', description: '', duration: 6000, isClosable: true },
            error: { title: 'Email ou senha incorretos.', description: 'Por favor, tente novamente.', duration: 6000, isClosable: true },
          });
      } else {
        const login = {
          email: null,
          username: user.data,
          senha: user.senha
        }
        apiUnAuth.post('/login', login).then(({ data }) => {
          throw dispactch(loadSession(data))
        }).catch((error) => {
          setOnLoading(false);
          console.log(error)
        })
      }
    } catch {

      setOnLoading(false)
    }
  };



  return (
    <>
      <form className="custom-formcomp" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mt-2 ">
          <label htmlFor="exampleFormControl1">Endereço de e-mail</label>
          <input
            type="text"
            className="form-control formcomp-input"
            id="exampleFormControl1"
            placeholder="Insira o e-mail"
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
    </>
  );
};
