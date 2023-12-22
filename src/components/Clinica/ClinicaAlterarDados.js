import React from "react";
import { Button } from "@chakra-ui/react";

export const ClinicaAlterarDados = ({ voltarParaClinicaDados }) => {
    const handleVoltarClick = () => {
        voltarParaClinicaDados(); // Chama a função para voltar à renderização de ClinicaDados
      };
    
  return (
    <div>
    <h2>Alterar Dados</h2>
    <Button onClick={handleVoltarClick}>Voltar</Button>
  </div>
  );
};