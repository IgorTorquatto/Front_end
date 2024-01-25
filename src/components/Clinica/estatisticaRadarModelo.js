export const optionsModelo = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Comparação entre os diagnósticos e as classificações do modelo [nome]',
        },
    },
};

const labels = ['Pneumonia', 'Tuberculose', 'COVID-19', 'Saudável'];
export const dataModelo = {
    labels,
    datasets: [
        {
            label: 'Diagnósticos',
            data: [30, 24, 34, 13],
            backgroundColor: 'rgba(0, 131, 202, 0.7)',
            borderColor: 'rgba(0, 131, 202)',
            borderWidth: 1
        },
        {
            label: 'Classificações',
            data: [20, 32, 39, 10],
            backgroundColor: 'rgb(11, 42, 69, 0.7)',
            borderColor: 'rgb(11, 42, 69, 0.7)',
            borderWidth: 1
        },
    ],
};