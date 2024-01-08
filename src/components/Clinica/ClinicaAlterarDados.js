import React from "react";
import "./ClinicaAlterarDados.css";
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from "../../services/api";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { editProfile } from "../../store/ducks/tokens/actions";

const schema = yup.object({
  nome: yup.string().required('Informe seu nome'),
  telefone: yup.string(),
  email: yup.string().email(),
  cnpj: yup.string().required('Informe um cpf valido'),
  cep: yup.string(),
  logradouro: yup.string(),
  bairro: yup.string(),
  cidade: yup.string(),
  numero: yup.string(),
  estado: yup.string(),
}).required();

export const ClinicaAlterarDados = ({ voltarParaClinicaDados }) => {

  const { data: user } = useSelector((state) => state.tokens);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema)
  });
  console.log(user.data)
  const onSubmit = async (editClinica) => {
    console.log(editClinica)
    await api.put(`/clinica/${user.data.id}`, editClinica).then(({ data }) => {
      console.log(data)
      dispatch(editProfile(data.data));
      handleVoltarClick()
    }).catch(({ error }) => {
      // alert("Error ao cadastrar")
    })
  };
  const handleVoltarClick = () => {
    voltarParaClinicaDados(); // Chama a função para voltar à renderização de ClinicaDados
  };

  return (
    <>
      <div className="Clinica-atualizarDados-container">
        <h2>Atualizar Dados</h2>
        <form className="custom-formcomp mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="row perfil-row">
            <div className="col-md-6">
              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputNome">Nome: </label>
                <input
                  type="text"
                  className="form-control formcomp-input"
                  id="FormControlInputNome"
                  placeholder="Nome"
                  {...register("nome")}
                  defaultValue={user.data?.nome}
                />
                <div className={errors.nome ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                  <AiOutlineInfoCircle />
                  <p>{errors.nome?.message}</p>
                </div>
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
                  placeholder="email@email.com"
                  {...register("email")}
                  defaultValue={user.data?.email}
                />
                <div className={errors.email ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                  <AiOutlineInfoCircle />
                  <p>{errors.email?.message}</p>
                </div>
              </div>

              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputCNPJ">CNPJ: </label>
                <input
                  type="text"
                  className="form-control formcomp-input"
                  id="FormControlInputCNPJ"
                  placeholder="Atualize o seu CNPJ"
                  {...register("cnpj")}
                  defaultValue={user.data?.cnpj}
                />
                <div className={errors.cnpj ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                  <AiOutlineInfoCircle />
                  <p>{errors.cnpj?.message}</p>
                </div>
              </div>

              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputTel"> Telefone: </label>
                <input
                  type="tel"
                  className="form-control formcomp-input"
                  id="FormControlInputTel"
                  placeholder="Insera seu telefone"
                  pattern="[0-9]*"
                  title="Digite apenas números"
                  {...register("telefone")}
                  defaultValue={user.data?.telefone}
                />
                <div className={errors.telefone ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                  <AiOutlineInfoCircle />
                  <p>{errors.telefone?.message}</p>
                </div>
              </div>
              <div className="form-group mt-2 ">
              <label htmlFor="FormControlInputEndereco">CEP:</label>
              <input
                type="text"
                className="form-control formcomp-input"
                id="FormControlInputEndereco"
                placeholder="Insira o seu  endereço"
                {...register("cep")}
                defaultValue={user.data?.cep}
              />
              <div className={errors.cep ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                <AiOutlineInfoCircle />
                <p>{errors.cep?.message}</p>
              </div>
            </div>
            </div>
           

            <div className="col-md-6">

              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputEndereco">Logradouro:</label>
                <input
                  type="text"
                  className="form-control formcomp-input"
                  id="FormControlInputEndereco"
                  placeholder="Insira o seu  endereço"
                  {...register("logradouro")}
                  defaultValue={user.data?.logradouro}
                />
                <div className={errors.logradouro ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                  <AiOutlineInfoCircle />
                  <p>{errors.logradouro?.message}</p>
                </div>
              </div>
              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputEndereco">Bairro:</label>
                <input
                  type="text"
                  className="form-control formcomp-input"
                  id="FormControlInputEndereco"
                  placeholder="Insira o seu  endereço"
                  {...register("bairro")}
                  defaultValue={user.data?.bairro}
                />
                <div className={errors.bairro ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                  <AiOutlineInfoCircle />
                  <p>{errors.bairro?.message}</p>
                </div>
              </div>
              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputEndereco">Cidade:</label>
                <input
                  type="text"
                  className="form-control formcomp-input"
                  id="FormControlInputEndereco"
                  placeholder="Insira o seu  endereço"
                  {...register("cidade")}
                  defaultValue={user.data?.cidade}
                />
                <div className={errors.cidade ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                  <AiOutlineInfoCircle />
                  <p>{errors.cidade?.message}</p>
                </div>
              </div>
              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputEndereco">Numero:</label>
                <input
                  type="text"
                  className="form-control formcomp-input"
                  id="FormControlInputEndereco"
                  placeholder="Insira o seu  endereço"
                  {...register("numero")}
                  defaultValue={user.data?.numero}
                />
                <div className={errors.numero ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                  <AiOutlineInfoCircle />
                  <p>{errors.numero?.message}</p>
                </div>
              </div>
              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputEndereco">Estado:</label>
                <input
                  type="text"
                  className="form-control formcomp-input"
                  id="FormControlInputEndereco"
                  placeholder="Insira o seu  endereço"
                  {...register("estado")}
                  defaultValue={user.data?.estado}
                />
                <div className={errors.estado ? 'showerror errorDiv' : 'hideerror errorDiv'}>
                  <AiOutlineInfoCircle />
                  <p>{errors.estado?.message}</p>
                </div>
              </div>


            </div>
          </div>
          <div className="Clinica-atualizarDados-buttons">
            <button type="submit" className="btn-salvar">
              Atualizar dados
            </button>
            <button
              type="button"
              className="btn-cancelar"
              onClick={handleVoltarClick}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
