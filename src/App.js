import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Sobre} from './pages/Sobre'
import {Diagnostico} from './pages/Diagnostico'
import {Historico} from './pages/Historico'
import {Pacientes} from './pages/Pacientes'
import {Home} from './pages/Home'
import { Cadastro } from './pages/Cadastro'
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/diagnostico" element={<Diagnostico />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/pacientes" element={<Pacientes />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
