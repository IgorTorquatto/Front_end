import { Bar } from "react-chartjs-2";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Flex } from "@chakra-ui/react";
import { Spinner } from "react-bootstrap";

export const BarAtendimentos = (args) => {
    
    const { data: user } = useSelector((state) => state.tokens);
    const [labels, setLabels] = useState([])
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const optionsPacientes = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
            },
            title: {
                display: true,
                text: `Atendimentos realizados pela clínica ${user.data.nome} durante o ano de ${args.anoRef}`,
            },
        },
    };

    async function loadBarPacientes(){
        setIsLoading(true)
        await api.post(`/diagnostico/atendimentos/${args.anoRef}`, {'clinica_id': user.data.id}).then( ({ data }) => {
            setLabels(data.labels)
            setData(data.data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        loadBarPacientes()
    }, [])
    
    const dataPacientes = {
        labels,
        datasets: [
            {
                label: 'Atendimentos',
                data: data,
                backgroundColor: 'rgba(0, 131, 202, 0.7)',
                borderColor: 'rgba(0, 131, 202)',
                borderWidth: 1
            },
        ],
    };

    return (
        <Flex justifyContent='center' alignItems='center' h={'100%'}>
            { isLoading ? <Spinner size='md'/> :
                <Bar options={optionsPacientes} data={dataPacientes} />
            }
        </Flex>
    )
}
