import { createContext, useContext, useState, useEffect } from 'react';
import { ClinicaDados } from "../components/Clinica/ClinicaDados";
import { ClinicaAlterarSenha } from "../components/Clinica/ClinicaAlterarSenha";
import { CadastrarMedico } from "../components/Clinica/CadastrarMedico";
import { Estatisticas } from "../components/Clinica/Estatisticas";
import { GerenciarIA } from "../components/Clinica/GerenciarIA";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from '../services/api';
const ClinicaContext = createContext();

export function ClinicaProvider({ children }) {
  const { data: user } = useSelector((state) => state.tokens);
  const loadClinica = () => {
    let clinica = localStorage.getItem("@Clinica")
    try {
      const clinicaJSON = JSON.parse(clinica);
      return clinicaJSON
    } catch (error) {
      return {}
    }

  }
  const [clinica, setClinica] = useState(loadClinica())
  const [clinicas, setClinicas] = useState([])

  useEffect(() => {
    (async () => {
      if (user.data.crm) {
        await loadClinicas().then(() => {
        })
      }
    })()
  }, [])



  async function loadClinicas() {
    await api.get(`/medico/${user.data.id}/clinica`).then(({ data }) => {
      setClinicas(data.data)
    })
  }
  function handleClinica(clinicaId) {

    let clinica = clinicas.find(clinica => clinica.id === clinicaId)
    const clinicaString = JSON.stringify(clinica);
    localStorage.setItem(
      "@Clinica",
      clinicaString
    );
    setClinica(clinica)
  }




  return (
    <ClinicaContext.Provider
      value={{ clinica, handleClinica }}
    >
      {children}
    </ClinicaContext.Provider>
  );
}

export function useClinica() {
  const context = useContext(ClinicaContext);

  return context;
}