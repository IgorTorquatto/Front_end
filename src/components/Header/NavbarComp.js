import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/noto_lungs.png'
import './NavBarComp.css'

import { AiOutlineProfile } from "react-icons/ai";
import { MdOutlineExitToApp } from "react-icons/md";
import { Avatar, Box, Text, IconButton} from '@chakra-ui/react'
import { TriangleDownIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons'
import { loadLogout, loadSession } from '../../store/ducks/tokens/actions.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

export const NavbarComp = ({ customClass, showEntrarButton }) => {
  const { data: user } = useSelector((state) => state.tokens);
  const navbarClassName = customClass ? `custom-navbar ${customClass}` : 'custom-navbar'
  const history = useNavigate();
  const dispactch = useDispatch();

  function LoggoutAccount() {
    dispactch(loadLogout())
    history('/')
  }

  return (

    <>
      <Navbar className={navbarClassName} expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            <img src={logo} alt="Logo" /><span className="brand-text">d.IAgnostica</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="center-nav-links">
              <Nav.Link as={Link} to={"/sobre"}>Sobre Nós</Nav.Link>
              <Nav.Link as={Link} to={"/diagnostico"}>Diagnóstico</Nav.Link>
              <Nav.Link as={Link} to={"/historico"}>Histórico</Nav.Link>
              <Nav.Link as={Link} to={"/pacientes"}>Pacientes</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {user.logged ? (
            <Box display='flex' color='white' alignItems={'center'} verticalAlign='center' >
              <Avatar name={user.data.pessoa.nome} src='https://bit.ly/broken-link' />
              <Menu >
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<HamburgerIcon />}
                  variant='outline'
                  border='none'
                  colorScheme='white'
                />
                <MenuList colorScheme='white' className='menulist' background='white' padding='0.5rem 0' color='#0B2A45'>
                  <MenuItem  icon={<AiOutlineProfile />} command='Em produção'>
                    Perfil 
                  </MenuItem>
                
                  <MenuItem icon={<MdOutlineExitToApp />} onClick={()=>{LoggoutAccount()}}>
                    Sair 
                  </MenuItem>
                </MenuList>
              </Menu>

            </Box>
          ) :
            <Button as={Link} to="/login" variant="light" className="entrar-button">
              entrar
            </Button>}

        </Container>
      </Navbar>
    </>

  )
}