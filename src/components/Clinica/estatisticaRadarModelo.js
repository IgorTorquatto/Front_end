import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { api } from "../../services/api";
import { Flex, Spinner } from "@chakra-ui/react";

export const RadarModeloMedico = (args) => {

    const { data: user } = useSelector((state) => state.tokens);
    const [labels, setLabels] = useState([])
    const [modelo, setModelo] = useState(null)
    const [data, setData] = useState([])
    const [classes, setClasses] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const optionsModelo = {
        responsive: true,
        type: 'radar',
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            title: {
                display: true,
                text: `Comparação entre os diagnósticos e as classificações do modelo ${modelo}`,
            },
        },
    };

    async function loadRadarModeloMedico() {
        setIsLoading(true)
        await api.post(`/diagnostico/diagnosticos/classificacoes`, { 'clinica_id': user.data.id, 'modelo_id': user.data.modelo_id }).then(({ data }) => {
            if (data.result == 1) {
                setLabels(data.labels)
                setData(data.data)
                setClasses(data.classes)
                setModelo(data.modelo)
            }
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        loadRadarModeloMedico()
    }, [])

    const dataModelo = {
        labels: classes,
        datasets: [
            {
                label: labels[0],
                data: data[0],
                backgroundColor: 'rgba(0, 131, 202, 0.7)',
                borderColor: 'rgba(0, 131, 202)',
                borderWidth: 1,
            },
            {
                label: labels[1],
                data: data[1],
                backgroundColor: 'rgb(11, 42, 69, 0.7)',
                borderColor: 'rgb(11, 42, 69, 0.7)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Flex justifyContent='center' alignItems='center' h={'100%'}>
            {isLoading ? <Spinner thickness='4px' size='lg' /> :
                <Radar options={optionsModelo} data={dataModelo} />
            }
        </Flex>
    )
} 
