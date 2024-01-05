import React from 'react'
import { Button } from "@chakra-ui/react";

export const ClinicaGerenciarFuncionarios = ({ voltarParaClinicaDados2 }) => {
    const handleVoltarClick = () => {
        voltarParaClinicaDados2(); // Chama a função para voltar à renderização de ClinicaDados
      };
    
    
  return (
    <div>
    <h2>Gerenciar Funcionários</h2>
    <Button onClick={handleVoltarClick}>Voltar</Button>
  </div>
  )
}
