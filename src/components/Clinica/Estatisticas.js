import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {dataPacientes, optionsPacientes} from './estatisticaBarPacientes'
import {dataClassificacao, optionsClassificacao} from './estatisticaPieClassificacao'
import {dataDoenca, optionsDoenca} from './estatisticaLineDoencas'
import './Estatisticas.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(ArcElement)
ChartJS.register(PointElement)
ChartJS.register(LineElement)

export const Estatisticas = () => {
  return (

    <div class="container">
      <div class="tituloPagina">
        <h2>Dashboard</h2>
        <h3>Painel da clínica</h3>
      </div>

      <div class="barAtendimentos dashboard">
        <Bar options={optionsPacientes} data={dataPacientes} />
      </div>

      <div class="pieClassificacao dashboard">
        <Pie options={optionsClassificacao} data={dataClassificacao} />
      </div>
      
      <div class="lineDoencas dashboard">
        <Line options={optionsDoenca} data={dataDoenca}/>
      </div>
      <div class="info1 dashboard"></div>
      <div class="info2 dashboard"></div>
    </div>
  )
}
