import { color } from "chart.js/helpers";
import { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {

    // setting Dark/light mode-----------------------------------------------------------initialize-----
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
      document.body.className = darkMode ? "bg-dark text-light" : "";
    }, [darkMode]);
    // setting Dark/light mode-----------------------------------------------------------end-----

    
  return (
    <Navbar variant="dark" expand="lg" style={{ backgroundColor: "rgb(41, 60, 87)", boxShadow: "-1px 2px 31.1px -2px #6a6b7d8c" }} collapseOnSelect>
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand as={Link} to="/">
          My Dashboard
        </Navbar.Brand>

        {/* Hamburger toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>

          
            <Nav.Link>
              <Button
                variant={darkMode ? "light" : "dark"}
                onClick={() => setDarkMode(!darkMode)}
                className="rounded rounded-circle fs-5"
              >
                {darkMode ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon"></i>}
              </Button>
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}