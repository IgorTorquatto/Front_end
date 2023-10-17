import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import logo from '../../assets/noto_lungs.png'
import user from '../../assets/lucide_user-circle-2.png'
import './NavBarComp.css'

export const NavbarComp=() => {
  return (

   <>
      <Navbar className="custom-navbar" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to={ "/"}>
            <img src={logo} alt="HermesIA Logo" /> HermesIA
          </Navbar.Brand>
          <Nav className="center-nav-links">
            <Nav.Link as={Link} to={ "/sobre"}>Sobre Nós</Nav.Link>
            <Nav.Link as={Link} to={ "/diagnostico"}>Diagnóstico</Nav.Link>
            <Nav.Link as={Link} to={ "/historico"}>Histórico</Nav.Link>
            <Nav.Link as={Link} to={ "/pacientes"}>Pacientes</Nav.Link>
            <Nav.Link as={Link} to={ "/cadastro"} className="no-underline-focus">
              <img src={user} alt="User"/>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
   </>
   
  )
}