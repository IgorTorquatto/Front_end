import React from 'react'
import './Estatisticas.css'
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
  RadialLinearScale,
  Filler,
} from 'chart.js';
import { Bar, Pie, Line, Radar } from 'react-chartjs-2';
import {dataPacientes, optionsPacientes} from './estatisticaBarPacientes'
import {dataClassificacao, optionsClassificacao} from './estatisticaPieClassificacao'
import {dataDoenca, optionsDoenca} from './estatisticaLineDoencas'
import {dataModelo, optionsModelo} from './estatisticaRadarModelo'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Title,
  Tooltip,
  Legend,
);

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
      <div class="info1 dashboard">
        <Radar options={optionsModelo} data={dataModelo}/>
      </div>
      <div class="info2 dashboard"></div>
    </div>
  )
}
