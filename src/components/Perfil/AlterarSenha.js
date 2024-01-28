import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiUnAuth } from "../../services/api.ts";
import { loadSession } from "../../store/ducks/tokens/actions.ts";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useToast, Button } from "@chakra-ui/react";
import "./AlterarSenha.css";

export const AlterarSenha = ({ onCancel }) => {
  const { data: user } = useSelector((state) => state.tokens);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
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
    setLoading(true);

    await toast.promise(
      apiUnAuth
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
            setLoading(false);
            dispatch(loadSession(login));
            history("/sobre");
          })
          .catch(({err}) => {
            throw err;
          });
      })
      .catch(({ error }) => {
        // alert("Error ao cadastrar")
        setLoading(false);
        throw error;
      }),
      {
        loading: { title: 'Atualização em andamento.', description: 'Por favor, aguarde.' },
        success: { title: 'Senha atualizada com sucesso!', duration: 6000, isClosable: true},
        error: { title: 'Erro ao atualizar senha.', description: 'Por favor, tente novamente.', duration: 6000, isClosable: true}, 
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
            <Button type="submit" className="btn-salvar" isLoading={loading} colorScheme="blue">
              Atualizar dados
            </Button>
            <Button
              type="button"
              className="btn-cancelar"
              onClick={handleCancel}
              colorScheme="blackAlpha"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
