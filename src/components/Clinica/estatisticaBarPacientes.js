export const optionsPacientes = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Atendimentos realizados pela clínica [nome] durante o ano de [ano]',
        },
    },
};

const labels = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
export const dataPacientes = {
    labels,
    datasets: [
        {
            label: 'Atendimentos',
            data: [12, 24, 34, 23, 12, 23, 8, 21, 10, 9, 32, 8],
            backgroundColor: 'rgba(0, 131, 202, 0.7)',
            borderColor: 'rgba(0, 131, 202)',
            borderWidth: 1
        },
    ],
};