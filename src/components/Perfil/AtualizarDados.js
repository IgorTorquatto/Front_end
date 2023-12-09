import React from "react";
import { Menu, MenuItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadLogout } from "../../store/ducks/tokens/actions.ts";
import { MdOutlineExitToApp } from "react-icons/md";
import { FaUser, FaKey, FaSyncAlt } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { Avatar } from "@chakra-ui/react";
import { useState } from "react";
import logo from "../../assets/noto_lungs.png";
import { DiagnosticaLogo } from "../../components/Logo/DiagnosticaLogo";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api, apiUnAuth } from "../../services/api.ts";
import { loadSession } from "../../store/ducks/tokens/actions.ts";
import "./AtualizarDados.css";

export const AtualizarDados = () => {
  const { data: user } = useSelector((state) => state.tokens);
  const history = useNavigate();
  const dispatch = useDispatch();
  const schema = yup
    .object({
      nome: yup.string().required("Informe seu nome"),
      email: yup
        .string()
        .email("Informe um email valido")
        .required("Informe um email valido"),
      telefone: yup.string().required("Informe um telefone valido"),
      cpf: yup.string().required("Informe um cpf valido"),
      data_nascimento: yup
        .string()
        .required("Informe uma data de nascimento valida"),
      crm: yup.string().required("Informe um crm valido"),
      especialidade: yup.string().required("Informe uma especialidade valida"),
      senha: yup
        .string()
        .min(8, "a senha deve conter 8 caracteres")
        .required("Digite uma senha"),
      confirmarSenha: yup
        .string()
        .required("Digite sua senha novamente")
        .oneOf([yup.ref("senha")], "As senhas devem ser iguais"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (user) => {
    const pessoa = {
      cpf: user.cpf,
      data_nascimento: user.data_nascimento,
      nome: user.nome,
      telefone: user.telefone,
      cargo: "Médico",
    };
    await apiUnAuth
      .post("/pessoa", pessoa)
      .then(({ data }) => {
        const medico = {
          id_pessoa: data.data.id,
          crm: user.crm,
          especialidade: user.especialidade,
          senha: user.senha,
          email: user.email,
        };

        apiUnAuth
          .post("/medico", medico)
          .then(({ data }) => {
            const login = {
              email: user.email,
              senha: user.senha,
            };
            dispatch(loadSession(login));
            history("/sobre");
          })
          .catch(({}) => {});
      })
      .catch(({ error }) => {
        // alert("Error ao cadastrar")
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="custom-formcomp mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mt-2 ">
              <label htmlFor="FormControlInputNome">Nome: </label>
              <input
                type="text"
                className="form-control formcomp-input"
                id="FormControlInputNome"
                placeholder=""
                {...register("nome")}
                defaultValue={user.data.pessoa.nome}
              />
            </div>

            <div className="form-group mt-2 ">
              <label htmlFor="FormControlInputEmail">
                {" "}
                Endereço de email:{" "}
              </label>
              <input
                type="email"
                className="form-control formcomp-input"
                id="FormControlInputEmail"
                {...register("email")}
                placeholder="novoemail@email.com"
              />
            </div>

            <div className="form-group mt-2 ">
              <label htmlFor="FormControlInputCPF">CPF: </label>
              <input
                type="text"
                className="form-control formcomp-input"
                id="FormControlInputCPF"
                placeholder="Atualize o seu CPF"
                {...register("cpf")}
              />
            </div>

            <div className="form-group mt-2 ">
              <label htmlFor="FormControlInputCRM">CRM: </label>
              <input
                type="text"
                className="form-control formcomp-input"
                id="FormControlInputCRM"
                placeholder="Atualize o seu CRM"
                {...register("crm")}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group mt-2 ">
              <label htmlFor="FormControlInputData">Data de Nascimento: </label>
              <input
                type="date"
                className="form-control formcomp-input"
                id="FormControlInputData"
                placeholder="Digite seu nome completo"
                {...register("data_nascimento")}
              />
            </div>

            <div className="form-group mt-2 ">
              <label htmlFor="FormControlInputTel"> Telefone: </label>
              <input
                type="tel"
                className="form-control formcomp-input"
                id="FormControlInputTel"
                placeholder="(99) 9 9999-9999"
                pattern="[0-9]*"
                {...register("telefone")}
                title="Digite apenas números"
              />
            </div>

            <div className="form-group mt-2 ">
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
            </div>
          </div>
        </div>
        <div className="atualizarDados-buttons">
          <button type="submit" className="btn-salvar">
            Atualizar dados
          </button>
          <button type="button" className="btn-cancelar">
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};
