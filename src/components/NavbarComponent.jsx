import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-1">
      <Container>
        <Navbar.Brand >Shop Name</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;