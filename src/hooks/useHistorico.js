import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ClinicaDados } from "../components/Clinica/ClinicaDados";
import { ClinicaAlterarSenha } from "../components/Clinica/ClinicaAlterarSenha";
import { CadastrarMedico } from "../components/Clinica/CadastrarMedico";
import { Estatisticas } from "../components/Clinica/Estatisticas";
import { GerenciarIA } from "../components/Clinica/GerenciarIA";

const HistoricoContext = createContext();

export function HistoricoProvider({ children }) {

  const [historico, setHistorico] = useState(<ClinicaDados />)

    function handleHistorico(item) {
      switch (item) {
        case "Alterar Senha":
          setHistorico(<ClinicaAlterarSenha />);
          break;
        case "Cadastrar médico":
          setHistorico(<CadastrarMedico />);
          break;
        case "Estatísticas":
          setHistorico(<Estatisticas />);
          break;
        case "Gerenciar IA":
          setHistorico(<GerenciarIA />);
          break;
        default:
          setHistorico(<ClinicaDados />);
          break;
      }
    }
    
  return (
    <HistoricoContext.Provider
      value={{ historico, handleHistorico }}
    >
      {children}
    </HistoricoContext.Provider>
  );
}

export function useHistorico() {
  const context = useContext(HistoricoContext);

  return context;
}
