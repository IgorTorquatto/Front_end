import React, { useEffect } from "react";
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

import { api } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { ClinicaAlterarDados } from "./ClinicaAlterarDados";
import { ClinicaGerenciarFuncionarios } from "./ClinicaGerenciarFuncionarios";
export const ClinicaDados = () => {
  const { data: user } = useSelector((state) => state.tokens);
  const [funcionarios, setFuncionarios]  = useState([])

   const loadFuncionarios = async ()=>{
    await api.get(`/clinica/${user.data.id}/medico`).then(({data})=>{
      console.log(data)
      setFuncionarios(data.data)
    }).catch((data)=>{
      console.log(data)
    })
  }
  
  useEffect(()=>{
    loadFuncionarios()
  },[])
  

  const [isEditing, setIsEditing] = useState(false); 
  const [isManaging, setIsManaging] = useState(false);



  const voltarParaClinicaDados = () => {
    setIsEditing(false); // Define o estado para false, voltando à renderização de ClinicaDados
  };

  const voltarParaClinicaDados2 = () => {
    setIsManaging(false); // Define o estado para false, voltando à renderização de ClinicaDados
  };

  function handleEditClick() {
    setIsEditing(true); // Quando o botão de editar for clicado, definir o estado para true
  }

  function handleGerenciarClick() {
    setIsManaging(true); // Quando o botão de gerenciar for clicado, definir o estado para true
  }


  return (
    <>
     {isEditing ? ( // Se estiver em modo de edição, renderize o componente ClinicaAlterarDados
        <ClinicaAlterarDados voltarParaClinicaDados={voltarParaClinicaDados}/>
      ) : isManaging ? ( // Se estiver gerenciando funcionários, renderize o componente ClinicaGerenciarFuncionarios
        <ClinicaGerenciarFuncionarios voltarParaClinicaDados2={voltarParaClinicaDados2}/>
      ) : (
    <div className="clinicaDados-container">
      <div className="clinicaDados-section-top">
        <h2>Dados da Clínica</h2>
        <div className="clinicaDados-details">
          <div className="column">
            <div>
              <FaBuilding />
              <strong>Nome:</strong>
              <span>{user.data.nome}</span>
            </div>
            <div>
              <FaEnvelope />
              <strong>Email:</strong>
              <span>{user.data.email}</span>
            </div>
            <div>
              <FaPhone />
              <strong>Telefone:</strong>
              <span>{user.data.telefone}</span>
            </div>
          </div>
          <div className="column">
            <div>
              <FaIdCard />
              <strong>CNPJ:</strong>
              <span>{user.data.cnpj}</span>
            </div>
            <div>
              <FaMapMarked />
              <strong>CEP:</strong>
              <span>{user.data.cep}</span>
            </div>
            <div>
              <FaMap />
              <strong>Logradouro:</strong>
              <span>{user.data.logradouro}</span>
            </div>
          </div>
        </div>
        <div className="btn-clinica-editar">
          <Button leftIcon={<CiEdit />} colorScheme="blue" bgColor={'#007bff'} onClick={handleEditClick}> Editar</Button>
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
                  <td>{funcionario.pessoa.nome}</td>
                  <td>{funcionario.especialidade}</td>
                  <td>{funcionario.crm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

      </Box>
      <div className="btn-clinica-gerenciar">
        <Button leftIcon={<FaCog />} colorScheme="blue" bgColor={'#007bff'} onClick={handleGerenciarClick}> Gerenciar</Button>
      </div>
    </div>
    )}
  </>
  );
};
