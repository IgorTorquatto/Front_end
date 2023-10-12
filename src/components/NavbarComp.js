import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import {Sobre} from '../pages/Sobre'
import {Diagnostico} from '../pages/Diagnostico'
import {Historico} from '../pages/Historico'
import {Pacientes} from '../pages/Pacientes'
import {Home} from '../pages/Home'
import { Cadastro } from '../pages/Cadastro'
import logo from '../noto_lungs.png'
import user from '../lucide_user-circle-2.png'
import './NavBarComp.css'


function NavBarComp() {
  return (

  <BrowserRouter>
   <>

      <Navbar className="custom-navbar" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to={ "/home"}>
            <img src={logo}/> HermesIA
          </Navbar.Brand>
          <Nav className="center-nav-links">
            <Nav.Link as={Link} to={ "/sobre"}>Sobre Nós</Nav.Link>
            <Nav.Link as={Link} to={ "/diagnostico"}>Diagnóstico</Nav.Link>
            <Nav.Link as={Link} to={ "/historico"}>Histórico</Nav.Link>
            <Nav.Link as={Link} to={ "/pacientes"}>Pacientes</Nav.Link>
            <Nav.Link as={Link} to={ "/cadastro"} className="no-underline-focus">
              <img src={user}/>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/diagnostico" element={<Diagnostico />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/pacientes" element={<Pacientes />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
   </>
   </BrowserRouter>
  )
}

export default NavBarComp