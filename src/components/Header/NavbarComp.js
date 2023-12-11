import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/noto_lungs.png";
import "./NavBarComp.css";

import { AiOutlineProfile } from "react-icons/ai";
import { MdOutlineExitToApp } from "react-icons/md";
import { Avatar, Box, Text, IconButton } from "@chakra-ui/react";
import {
  TriangleDownIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { loadLogout, loadSession } from "../../store/ducks/tokens/actions.ts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { DiagnosticaLogo } from "../Logo/DiagnosticaLogo";

export const NavbarComp = ({ customClass, showEntrarButton }) => {
  const location = useLocation();
  const { data: user } = useSelector((state) => state.tokens);
  const navbarClassName = customClass
    ? `custom-navbar ${customClass}`
    : "custom-navbar";
  const history = useNavigate();
  const dispactch = useDispatch();

  function LoggoutAccount() {
    dispactch(loadLogout());
    history("/");
  }

  function PerfilPage() {
    history("/perfil");
  }

  return (
    <>
      <Navbar className={navbarClassName} expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            <DiagnosticaLogo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="center-nav-links">
              <Nav.Link
                as={Link}
                to={"/sobre"}
                className={location.pathname.includes("/sobre") ? "active" : ""}
              >
                <div
                  className={
                    location.pathname.includes("/sobre") ? "active" : ""
                  }
                >
                  Sobre Nós
                </div>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/diagnostico"}
                className={
                  location.pathname.includes("/diagnostico") ? "active" : ""
                }
              >
                <div
                  className={
                    location.pathname.includes("/diagnostico") ? "active" : ""
                  }
                >
                  Diagnóstico
                </div>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/historico"}
                className={
                  location.pathname.includes("/historico") ? "active" : ""
                }
              >
                <div
                  className={
                    location.pathname.includes("/historico") ? "active" : ""
                  }
                >
                  Histórico
                </div>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/pacientes"}
                className={
                  location.pathname.includes("/pacientes") ? "active" : ""
                }
              >
                <div
                  className={
                    location.pathname.includes("/pacientes") ? "active" : ""
                  }
                >
                  Pacientes
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {user.logged ? (
            <Box
              display="flex"
              color="white"
              alignItems={"center"}
              verticalAlign="center"
            >
              <Avatar
                name={user.data.pessoa.nome}
                src="https://bit.ly/broken-link"
              />
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                  border="none"
                  colorScheme="white"
                />
                <MenuList
                  colorScheme="white"
                  className="menulist"
                  background="white"
                  padding="0.5rem 0"
                  color="#0B2A45"
                >
                  <MenuItem
                    icon={<AiOutlineProfile />}
                    onClick={() => {
                      PerfilPage();
                    }}
                  >
                    Perfil
                  </MenuItem>

                  <MenuItem
                    icon={<MdOutlineExitToApp />}
                    onClick={() => {
                      LoggoutAccount();
                    }}
                  >
                    Sair
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ) : showEntrarButton ? (
            <Button
              as={Link}
              to="/login"
              variant="light"
              className="entrar-button"
            >
              entrar
            </Button>
          ) : null}
        </Container>
      </Navbar>
    </>
  );
};
