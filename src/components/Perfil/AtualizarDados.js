import React from "react";
import { Menu, MenuItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, loadLogout } from "../../store/ducks/tokens/actions.ts";
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

export const AtualizarDados = ({ onCancel }) => {
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
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (edit_user) => {
    const pessoa = {
      cpf: edit_user.cpf,
      data_nascimento: edit_user.data_nascimento,
      nome: edit_user.nome,
      telefone: edit_user.telefone,
      cargo: "Médico",
    };
    console.log(edit_user);
    await api
      .put(`/pessoa/${user.data.id_pessoa}`, pessoa)
      .then(({ data }) => {
        const medico = {
          id_pessoa: data.data.id,
          crm: edit_user.crm,
          especialidade: edit_user.especialidade,
          email: edit_user.email,
        };

        api
          .put(`/medico/${user.data.id}`, medico)
          .then(({ data }) => {
            dispatch(editProfile(data.data));
            history("/perfil");
          })
          .catch(({}) => {});
      })
      .catch(({ error }) => {
        // alert("Error ao cadastrar")
      });
  };

  const handleCancel = () => {
    onCancel();
  };
  return (
    <>
      <div className="atualizarDados-container">
        <h2>Atualizar Dados</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="custom-formcomp mt-4"
        >
          <div className="row perfil-row">
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
                  defaultValue={user.data.email}
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
                  defaultValue={user.data.pessoa.cpf}
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
                  defaultValue={user.data.crm}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputData">
                  Data de Nascimento:{" "}
                </label>
                <input
                  type="date"
                  className="form-control formcomp-input"
                  id="FormControlInputData"
                  placeholder="Digite seu nome completo"
                  {...register("data_nascimento")}
                  defaultValue={user.data.pessoa.data_nascimento}
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
                  defaultValue={user.data.pessoa.telefone}
                />
              </div>

              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputEsp">Especialização: </label>
                <select
                  className="form-control formcomp-input"
                  id="FormControlInputEsp"
                  {...register("especialidade")}
                  defaultValue={user.data.especialidade}
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
            <button
              type="button"
              className="btn-cancelar"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
