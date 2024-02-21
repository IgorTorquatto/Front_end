import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { Flex, Spinner } from "@chakra-ui/react";


export const PieClassificacao = (args) => {

    const { data: user } = useSelector((state) => state.tokens);
    const [labels, setLabels] = useState([])
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const optionsClassificacao = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Classificações realizadas pelo modelo [nome]',
            },
        },
    };

    async function loadPieClassificacao() {
        setIsLoading(true)
        await api.post(`/diagnostico/classificacoes/modelo`, { 'clinica_id': user.data.id }).then(({ data }) => {
            setLabels(data.labels)
            setData(data.data)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        loadPieClassificacao()
    }, [])

    const dataClassificacao = {
        labels,
        datasets: [
            {
                label: 'Classificações',
                data: data,
                backgroundColor: ['rgba(0, 131, 202, 0.7)', 'rgb(11, 42, 69, 0.7)'],
            },
        ],
    };

    return (
        <Flex justifyContent='center' alignItems='center' h={'100%'}>
            {isLoading ? <Spinner thickness='4px' size='lg' /> :
                <Pie options={optionsClassificacao} data={dataClassificacao} />
            }
        </Flex>
    )
} 