import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiUnAuth } from "../../services/api.ts";
import { loadSession } from "../../store/ducks/tokens/actions.ts";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./AlterarSenha.css";

export const AlterarSenha = ({ onCancel }) => {
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
  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <div className="alterarSenha-container">
        <h2>Alterar Senha</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="custom-formcomp mt-4"
        >
          <div className="row perfil-row">
            <div className="col-md-6 alterarSenha-inputs">
              <div className="form-group mt-2">
                <label htmlFor="FormControlInputSenha">Senha</label>
                <input
                  type="password"
                  className="form-control formcomp-input"
                  id="FormControlInputSenha"
                  placeholder="Informe  nova sua senha"
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

              <div className="form-group mt-5">
                <label htmlFor="FormControlInputConfirmarSenha">
                  Confirmar senha
                </label>
                <input
                  type="password"
                  className="form-control formcomp-input"
                  id="FormControlInputConfirmarSenha"
                  placeholder="Informe sua nova senha novamente"
                  {...register("confirmarSenha")}
                />
                <div
                  className={
                    errors.confirmarSenha
                      ? "showerror errorDiv"
                      : "hideerror errorDiv"
                  }
                >
                  <AiOutlineInfoCircle />
                  <p>{errors.confirmarSenha?.message}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="alterarSenha-buttons">
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
