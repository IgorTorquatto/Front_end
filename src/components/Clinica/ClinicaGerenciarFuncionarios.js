import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Button, Spinner, Flex } from "@chakra-ui/react";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import "./ClinicaGerenciarFuncionarios.css";

export const ClinicaGerenciarFuncionarios = ({ voltarParaClinicaDados2 }) => {
  const handleVoltarClick = () => {
    voltarParaClinicaDados2(); // Chama a função para voltar à renderização de ClinicaDados
  };

  const { data: user } = useSelector((state) => state.tokens);
  const [funcionarios, setFuncionarios] = useState([]);

  const loadFuncionarios = async () => {
    await api
      .get(`/clinica/${user.data.id}/medico`)
      .then(({ data }) => {
        console.log(data);
        setFuncionarios(data.data);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    loadFuncionarios();
  }, []);

  return (
    <>
      <div className="clinicaGerenciarFuncionarios-container">
        <h2>Gerenciar Funcionários</h2>
        <Box
          flex={1}
          alignItems={"center"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box
            w={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            mb={"15px"}
          >
          </Box>

          <Box
            w={"91%"}
            height={"42vh"}
            className="table-wrapper"
            maxHeight={"42vh"}
            px="0.5%"
          >
            {funcionarios.length < 1 ? (
              <Flex
                w="100%"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Spinner
                  emptyColor="gray.200"
                  thickness="5px"
                  color="#3b83c3"
                  size="xl"
                />
              </Flex>
            ) : (
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
                      <th scope="row">{index + 1}</th>
                      <td>{funcionario.pessoa.nome}</td>
                      <td>{funcionario.especialidade}</td>
                      <td>{funcionario.crm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Box>
        </Box>
        <Button onClick={handleVoltarClick} className="voltar-btn">
          Voltar
        </Button>
      </div>
    </>
  );
};
