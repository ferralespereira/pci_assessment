import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand as={Link} to="/">
          My Dashboard
        </Navbar.Brand>

        {/* Hamburger toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>

            {/* Optional dropdown */}
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}