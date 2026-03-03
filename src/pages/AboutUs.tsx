import Layout from "../components/Layout";
import { Container, Row, Col } from "react-bootstrap";

export default function AboutUs() {
  return (
    <Layout>
      <Container className="mt-4">
        <Row>
          <Col>
            <h1 className="text-center">About Us</h1>
            <h2 className="text-center fw-bold mt-3 fs-1">PCI TECHNICAL ASSESSMENT</h2>
            <div className="my-5 col-lg-8 mx-auto">
              <h3>Task Overview</h3>
              <p>
                Build an API Monitoring Dashboard that visually presents API request log data. The dashboard should display key metrics, charts/visual representations, and a detailed log table — all rendered from the provided JSON dataset.
              </p>
            </div>
            <table className="table table-striped mt-4">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Technology Stack</td>
                  <td>HTML5, CSS3, JavaScript, React, Bootstrap, chart.js</td>
                </tr>
                <tr>
                  <td>Summary Cards (KPI Section)</td>
                  <td>Total Requests, Successful Requests (200), Failed Requests, Average Response Time, Most Active Endpoint</td>
                </tr>
                <tr>
                  <td>Visual Charts / Graphs</td>
                  <td>Pie Chart, Bar Chart (Libraries Chart.js and react-chartjs-2)</td>
                </tr>
                <tr>
                  <td>Request Log Table (Display a detailed table with all the request logs.)</td>
                  <td>All fields from the JSON data displayed in a clean, readable format, Date/time formatted in a human-readable way (e.g., "Feb 20, 2025 — 08:15 AM"), Response codes visually differentiated using color-coded badges or tags</td>
                </tr>
              </tbody>
            </table>
            <p>
              This page is fully integrated with our main layout, including header, footer, and responsive design.
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}