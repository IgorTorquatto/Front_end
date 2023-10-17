import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Sobre} from './pages/Sobre/Sobre'
import {Diagnostico} from './pages/Diagnostico/Diagnostico'
import {Historico} from './pages/Historico/Historico'
import {Pacientes} from './pages/Pacientes/Pacientes'
import {Home} from './pages/Home/Home'
import { Cadastro } from './pages/Cadastro/Cadastro'
import './App.css'
import { NavbarComp } from './components/Header/NavbarComp'

function App() {
  return (
    <BrowserRouter>
    <>
    <NavbarComp/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/diagnostico" element={<Diagnostico />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/pacientes" element={<Pacientes />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
    </>
    </BrowserRouter>
  );
}

export default App;
