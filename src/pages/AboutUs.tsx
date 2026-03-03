import Layout from "../components/Layout";
import { Container, Row, Col } from "react-bootstrap";

export default function AboutUs() {
  return (
    <Layout>
      <Container className="mt-4">
        <Row>
          <Col>
            <h2>About Us</h2>
            <p>
              Welcome to our company! We are dedicated to providing the best service and products to our customers.
            </p>
            <p>
              This page is fully integrated with our main layout, including header, footer, and responsive design.
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}