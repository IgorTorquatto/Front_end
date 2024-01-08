export const optionsDoenca = {
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

const labels = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
export const dataDoenca = {
    labels,
    datasets: [
        {
            label: 'Pneumonia',
            data: [69, 47, 92, 54, 31, 98, 35, 16, 3, 27, 98, 28],
            backgroundColor: 'rgba(0, 131, 202, 0.7)',
            borderColor: 'rgba(0, 131, 202, 0.7)',
        },
        {
            label: 'COVID-19',
            data: [87, 19, 96, 3, 82, 61, 7, 18, 70, 56, 23, 95],
            backgroundColor: 'rgb(11, 42, 69, 0.7)',
            borderColor: 'rgb(11, 42, 69, 0.7)',
        },
        {
            label: 'Tuberculose',
            data: [52, 94, 97, 8, 22, 68, 91, 60, 79, 71, 17, 48],
            backgroundColor: 'rgb(80, 183, 161, 0.7)',
            borderColor: 'rgb(80, 183, 161, 0.7)',
        },
    ],
};