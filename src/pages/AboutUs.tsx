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
                  <td>HTML5, CSS3, TypeScript/JavaScript, React, Bootstrap, chart.js, react-router-dom</td>
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
                <tr>
                  <td>Responsive Design</td>
                  <td>The dashboard is fully responsive, ensuring optimal viewing and interaction across various devices and screen sizes.</td>
                </tr>
              </tbody>
            </table>
            <h4 className="text-center mt-4">Bonus features implemented</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dark/Light Mode</td>
                  <td>Toggle between light and dark color schemes</td>
                </tr>
                <tr>
                  <td>Animations & Transitions</td>
                  <td>Smooth transitions, hover effects, loading states</td>
                </tr>
                <tr>
                  <td>Export to CSV</td>
                  <td>Allow exporting the filtered table data as CSV</td>
                </tr>
                <tr>
                  <td>Table Sorting</td>
                  <td>Sort the log table by clicking column headers</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4">
              <h4>Here are brief and clear instructions to run this "React + Vite + TypeScript" project:</h4>
              <ol>
                <li>Clone the repository: <code>git clone https://github.com/ferralespereira/pci_assessment.git</code></li>
                <li>Navigate to the project directory: <code>cd pci_assessment</code></li>
                <li>Install dependencies: <code>npm install</code></li>
                <li>Start the development server: <code>npm run dev</code></li>
                <li>Open your browser and go to: <code>http://localhost:5173</code></li>
              </ol>
            </div>
            <div className="mt-4">
              <h4>Technologies/libraries used and why</h4>
              <table className="table table-striped">
              <thead>
                <tr>
                  <th>Technologies/libraries</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>React</td>
                  <td>Cleaner code, Reusability, Easier maintenance, Scalable structure</td>
                </tr>
                <tr>
                  <td>TypeScript</td>
                  <td>Type safety, Improved developer experience, Easier refactoring</td>
                </tr>
                <tr>
                  <td>Bootstrap</td>
                  <td>Responsive design, Pre-built components, Faster development</td>
                </tr>
                <tr>
                  <td>chart.js and react-chartjs-2</td>
                  <td>Powerful charting library, Easy integration with React, Customizable charts</td>
                </tr>
                <tr>
                  <td>react-router-dom</td>
                  <td>Client-side routing, Seamless navigation, Better user experience</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
        </Row>
      </Container>
    </Layout>
  );
}