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
  FaCog,
} from "react-icons/fa";

import { CiEdit } from "react-icons/ci";

import { Box, Divider, Button } from "@chakra-ui/react";

export const ClinicaDados = () => {
  //funcionários:
  const funcionarios = [
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
          <Button leftIcon={<CiEdit />} colorScheme="blue" bgColor={'#007bff'}> Editar</Button>
        </div>
      </div>

      <Divider />

      <Box flex={1} alignItems={'center'} display={'flex'} flexDirection={'column'}>

        <Box w={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} mb={'15px'}>
          <h2>Médicos Associados</h2>
        </Box>

        <Box w={'91%'} height={'42vh'} className="table-wrapper" maxHeight={'42vh'} px='0.5%'>
          <table className="table table-striped table-hover custom-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Especialidade</th>
                <th scope="col">CRM</th>
              </tr>
            </thead>
            <tbody id="clinica-medicos-tbody">
              {funcionarios.map((funcionario, index) => (
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.especialidade}</td>
                  <td>{funcionario.crm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

      </Box>
      <div className="btn-clinica-gerenciar">
        <Button leftIcon={<FaCog />} colorScheme="blue" bgColor={'#007bff'}> Gerenciar</Button>
      </div>
    </div>
  </>
  );
};
