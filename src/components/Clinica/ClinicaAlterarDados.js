import React from "react";
import "./ClinicaAlterarDados.css";

export const ClinicaAlterarDados = ({ voltarParaClinicaDados }) => {
  const handleVoltarClick = () => {
    voltarParaClinicaDados(); // Chama a função para voltar à renderização de ClinicaDados
  };

  return (
    <>
      <div className="Clinica-atualizarDados-container">
        <h2>Atualizar Dados</h2>
        <form className="custom-formcomp mt-4">
          <div className="row perfil-row">
            <div className="col-md-6">
              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputNome">Nome: </label>
                <input
                  type="text"
                  className="form-control formcomp-input"
                  id="FormControlInputNome"
                  placeholder="Nome"
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
                  placeholder="novoemail@email.com"
                />
              </div>

              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputCNPJ">CNPJ: </label>
                <input
                  type="text"
                  className="form-control formcomp-input"
                  id="FormControlInputCNPJ"
                  placeholder="Atualize o seu CNPJ"
                />
              </div>

              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputCEP">CEP: </label>
                <input
                  type="text"
                  className="form-control formcomp-input"
                  id="FormControlInputCRM"
                  placeholder="Atualize o seu CEP"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mt-2 ">
                <label htmlFor="FormControlInputEndereco">Endereço:</label>
                <input
                  type="text"
                  className="form-control formcomp-input"
                  id="FormControlInputEndereco"
                  placeholder="Insira o seu novo endereço"
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
                  title="Digite apenas números"
                />
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
