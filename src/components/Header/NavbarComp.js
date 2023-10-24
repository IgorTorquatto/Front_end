import React from 'react'
import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import logo from '../../assets/noto_lungs.png'
import './NavBarComp.css'

export const NavbarComp=( { customClass, showEntrarButton } ) => {

  const navbarClassName = customClass ? `custom-navbar ${customClass}` : 'custom-navbar' 

  return (

   <>
      <Navbar className={navbarClassName} expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to={ "/"}>
            <img src={logo} alt="Logo" /><span className="brand-text">d.IAgnostica</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="center-nav-links">
              <Nav.Link as={Link} to={ "/sobre"}>Sobre Nós</Nav.Link>
              <Nav.Link as={Link} to={ "/diagnostico"}>Diagnóstico</Nav.Link>
              <Nav.Link as={Link} to={ "/historico"}>Histórico</Nav.Link>
              <Nav.Link as={Link} to={ "/pacientes"}>Pacientes</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          
          {showEntrarButton && (
            <Button as={Link} to="/cadastro" variant="light" className="entrar-button">
              entrar
            </Button>
          )}

        </Container>
      </Navbar>
   </>
   
  )
}