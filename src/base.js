import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

function Base({ children }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm" className="p-0">
        <Container>
          <Navbar.Brand href="#home">Blogen</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse id="navbarCollapse">
            <Nav className="mr-auto">
              <Nav.Link href="#dashboard" className="px-2 active">
                Dashboard
              </Nav.Link>
              <Nav.Link href="#posts" className="px-2">
                Posts
              </Nav.Link>
              <Nav.Link href="#categories" className="px-2">
                Categories
              </Nav.Link>
              <Nav.Link href="#users" className="px-2">
                Users
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <NavDropdown
                title={
                  <>
                    <i className="fas fa-user"></i> Welcome Brad
                  </>
                }
                id="basic-nav-dropdown"
                className="mr-3"
              >
                <NavDropdown.Item href="#profile">
                  <i className="fas fa-user-circle"></i> Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#settings">
                  <i className="fas fa-cog"></i> Settings
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#logout">
                <i className="fas fa-user-times"></i> Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>{children}</div>
      <footer id="main-footer" className="bg-dark text-white mt-5 p-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="lead text-center">
                Copyright &copy;
                <span id="year"></span>
                Blogen
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Base;
