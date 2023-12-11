import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sobre } from './pages/Sobre/Sobre'
import { Diagnostico } from './pages/Diagnostico/Diagnostico'
import { Historico } from './pages/Historico/Historico'
import { Pacientes } from './pages/Pacientes/Pacientes'
import { Home } from './pages/Home/Home'
import { Cadastro } from './pages/Cadastro/Cadastro'
import { Login } from './pages/Login/Login'
import { Perfil } from './pages/Perfil/Perfil'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { HistoricoDetalhes } from './pages/Historico/HistoricoDetalhes'

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
          <Route path="/historico" element={<Historico />} />
          <Route path='/historico/detalhes' element={<HistoricoDetalhes />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;
