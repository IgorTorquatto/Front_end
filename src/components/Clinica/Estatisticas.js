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
import { BarAtendimentos } from './estatisticaBarPacientes'
import { PieClassificacao } from './estatisticaPieClassificacao'
import {LineDoencas} from './estatisticaLineDoencas'
import {RadarModeloMedico} from './estatisticaRadarModelo'

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
        <BarAtendimentos anoRef={2024} />
      </div>

      <div class="pieClassificacao dashboard">
        <PieClassificacao />
      </div>
      
      <div class="lineDoencas dashboard">
        <LineDoencas anoRef={2024} />
      </div>
      
      <div class="info1 dashboard">
        <RadarModeloMedico />
      </div>
    </div>
  )
}
