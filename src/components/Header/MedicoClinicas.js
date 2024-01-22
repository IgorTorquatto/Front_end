import { Avatar, MenuItem } from "@chakra-ui/react";
import { api } from "../../services/api"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";

export const MedicoClinicas = (medico_id, clinica_id) => {

    const [clinicas, setClinicas] = useState([]);
    const [clinicaModify, setClinicaModify] = useState(null);
    const { data: user } = useSelector((state) => state.tokens);

    const loadClinicas = async () => {
        await api.get(`/medico/${medico_id.medico_id}/clinica`).then(({data})=>{
          setClinicas(data.data)
        })
      }
    useEffect(() => { (async () => { await loadClinicas().then(() => {})})()}, [])

    useEffect(() => {
        if (clinicaModify){
            window.location.reload()
            setClinicaModify(false)
        }
    }, clinicaModify)

    return (
        clinicas.map( clinica => {
            let click = (clinica_id) => {
                user.data.clinica = clinicas.find(clinica => clinica.id === clinica_id)
                setClinicaModify(true)
            }

            return <MenuItem value={clinica.id} onClick={(e) => {click(e.target.value)}} icon={ <Avatar name={clinica.nome} src={clinica.foto_perfil} /> }>{clinica.nome}</MenuItem>
        })
    )

}