export const optionsClassificacao = {
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

const labels = ['Convergentes', 'Divergentes'];
export const dataClassificacao = {
    labels,
    datasets: [
        {
            label: 'Classificações',
            data: [90, 10],
            backgroundColor: ['rgba(0, 131, 202, 0.7)', 'rgb(11, 42, 69, 0.7)'],
        },
    ],
};