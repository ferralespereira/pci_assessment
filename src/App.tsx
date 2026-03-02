import { Button, Alert, Navbar, Container, Nav } from 'react-bootstrap';
import data from './api_logs.json'; 

function App(): JSX.Element {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">MyApp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Alert variant="success">
          Welcome to React-Bootstrap! 🎉
        </Alert>
        <Button variant="primary">Click Me</Button>
      </Container>
    </div>
  );
}

export default App;