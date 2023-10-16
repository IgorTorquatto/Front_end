import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Sobre} from './pages/Sobre'
import {Diagnostico} from './pages/Diagnostico'
import {Historico} from './pages/Historico'
import {Pacientes} from './pages/Pacientes'
import {Home} from './pages/Home'
import { Cadastro } from './pages/Cadastro'
import './App.css'
import { NavbarComp } from './components/NavbarComp'

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
