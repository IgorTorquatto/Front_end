import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { api } from "../../services/api";
import { Flex, Spinner } from '@chakra-ui/react'

export const LineDoencas = (args) => {

    const { data: user } = useSelector((state) => state.tokens);
    const [labels, setLabels] = useState([])
    const [data, setData] = useState([])
    const [lines, setLines] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const optionsDoenca = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Diagnósticos de doenças realizados por médicos',
            },
        },
    };

    async function loadLineDoencas() {
        setIsLoading(true)
        await api.post(`/diagnostico/diagnosticos/${args.anoRef}`, { 'clinica_id': user.data.id }).then(({ data }) => {
            setLabels(data.labels)
            setData(data.data)
            setLines(data.lines)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        loadLineDoencas()
    }, [])

    const choose_color = (n) => {
        let a = n % 3
        if (a === 0) {
            return 'rgba(0, 131, 202, 0.7)'
        }
        else if (a === 1) {
            return 'rgb(11, 42, 69, 0.7)'
        }
        else {
            return 'rgb(80, 183, 161, 0.7)'
        }
    }

    const datasets_objects = () => {
        let datasets = []
        let i = 0
        data.forEach((data) => {
            datasets.push(
                {
                    label: lines[i],
                    data: data,
                    backgroundColor: choose_color(i),
                    borderColor: choose_color(i),
                }
            )
            i += 1
        })

        return datasets
    }

    const dataDoenca = {
        labels,
        datasets: datasets_objects(),
    };

    return (
        <Flex justifyContent='center' alignItems='center' h={'100%'}>
            {isLoading ? <Spinner thickness='4px' size='lg' /> :
                <Line options={optionsDoenca} data={dataDoenca} />
            }
        </Flex>
    )
}