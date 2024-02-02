import { Avatar, MenuItem } from "@chakra-ui/react";
import { api } from "../../services/api"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useClinica } from '../../hooks/useClinica';

export const MedicoClinicas = (medico_id) => {

    const [clinicas, setClinicas] = useState([]);
    // var [clinica, setClinica] = useState(null);
    const { data: user } = useSelector((state) => state.tokens);
  const {clinica, handleClinica } = useClinica()
  const history = useNavigate()
    const local = useLocation()

    async function loadClinicas() {
        await api.get(`/medico/${medico_id.medico_id}/clinica`).then(({data})=>{
          setClinicas(data.data)
        })
    }

    useEffect(() => { (async () => { await loadClinicas().then(() => {})})()}, [])

    useEffect(() => {
        if (clinica) {
            history(local.pathname)
        }
    }, [clinica])

    return (
        clinicas.map(clinicavalue => {
            let click = (clinica_id) => {
                handleClinica(clinica_id)
            }
            
            let disable = clinica ? clinica.id === clinicavalue.id : false 
            return (
                <MenuItem isDisabled={disable} 
                    value={clinicavalue.id} 
                    onClick={(e) => {click(e.target.value)}} 
                    icon={ <Avatar name={clinicavalue.nome} 
                    src={clinicavalue.foto_perfil} /> }>{clinicavalue.nome}</MenuItem>
            )
        })
    )

}