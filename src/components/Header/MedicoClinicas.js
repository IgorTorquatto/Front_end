import { Avatar, MenuItem } from "@chakra-ui/react";
import { api } from "../../services/api"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export const MedicoClinicas = (medico_id) => {

    const [clinicas, setClinicas] = useState([]);
    var [clinica, setClinica] = useState(null);
    const { data: user } = useSelector((state) => state.tokens);
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
        clinicas.map(clinica => {
            let click = (clinica_id) => {
                user.data.clinica = clinicas.find(clinica => clinica.id === clinica_id)
                setClinica(user.data.clinica)
            }
            
            let disable = user.data.clinica ? user.data.clinica.id === clinica.id : false 
            return (
                <MenuItem isDisabled={disable} 
                    value={clinica.id} 
                    onClick={(e) => {click(e.target.value)}} 
                    icon={ <Avatar name={clinica.nome} 
                    src={clinica.foto_perfil} /> }>{clinica.nome}</MenuItem>
            )
        })
    )

}