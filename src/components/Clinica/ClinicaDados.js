import React from "react";
import "./ClinicaDados.css";
import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaMap,
  FaMapMarked,
  FaIdCard,
} from "react-icons/fa";

export const ClinicaDados = () => {
  //funcionários:
  const allFuncionarios = [
    {
      nome: "João Silva",
      especialidade: "Pneumologia",
      crm: "12345",
    },
    {
      nome: "Maria Souza",
      especialidade: "Pneumologia",
      crm: "67890",
    },
    {
      nome: "Pedro Oliveira",
      especialidade: "Pneumologia",
      crm: "24680",
    },
    {
      nome: "Ana Santos",
      especialidade: "Pneumologia",
      crm: "13579",
    },
    {
      nome: "Carlos Ferreira",
      especialidade: "Pneumologia",
      crm: "97531",
    },
    {
      nome: "Lúcia Mendes",
      especialidade: "Pneumologia",
      crm: "86420",
    },
    {
      nome: "Lúcia Mendes",
      especialidade: "Pneumologia",
      crm: "86420",
    },
    {
      nome: "Lúcia Mendes",
      especialidade: "Pneumologia",
      crm: "86420",
    },
    {
      nome: "Lúcia Mendes",
      especialidade: "Pneumologia",
      crm: "86420",
    },
  ];

  // Estado para controlar a página atual e os funcionários exibidos
  const [currentPage, setCurrentPage] = useState(0);

  // Número de funcionários exibidos por página
  const funcionariosPorPagina = 5; //+ de 7 transborda a div da página

  // Cálculo do índice inicial e final dos funcionários a serem exibidos na página atual
  const startIndex = currentPage * funcionariosPorPagina;
  const endIndex = startIndex + funcionariosPorPagina;
  const currentFuncionarios = allFuncionarios.slice(startIndex, endIndex);

  // Funções para navegar entre as páginas
  const goToNextPage = () => {
    if (
      currentPage <
      Math.ceil(allFuncionarios.length / funcionariosPorPagina) - 1
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="clinicaDados-container">
        <div className="clinicaDados-section-top">
          <h2>Dados da Clínica</h2>
          <div className="clinicaDados-details">
            <div className="column">
              <div>
                <FaBuilding />
                <strong>Nome:</strong>
              </div>
              <div>
                <FaEnvelope />
                <strong>Email:</strong>
              </div>
              <div>
                <FaPhone />
                <strong>Telefone:</strong>
              </div>
            </div>
            <div className="column">
              <div>
                <FaIdCard />
                <strong>CNPJ:</strong>
              </div>
              <div>
                <FaMapMarked />
                <strong>CEP:</strong>
              </div>
              <div>
                <FaMap />
                <strong>Endereço:</strong>
              </div>
            </div>
          </div>
          <div className="btn-clinica-editar">
            <button>Editar</button>
          </div>
        </div>

        <div className="clinicaDados-section-bottom">
          <h2>Funcionários Associados</h2>
          <table className="funcionarios-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Especialidade</th>
                <th>CRM</th>
              </tr>
            </thead>
            <tbody>
              {currentFuncionarios.map((funcionario, index) => (
                <tr key={index}>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.especialidade}</td>
                  <td>{funcionario.crm}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button className="btn-paginacao" onClick={goToPrevPage}>
              Anterior
            </button>
            <button className="btn-paginacao" onClick={goToNextPage}>
              Próximo
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
