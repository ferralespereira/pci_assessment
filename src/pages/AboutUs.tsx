import Layout from "../components/Layout";
import { Container, Row, Col } from "react-bootstrap";

export default function AboutUs() {
  return (
    <Layout>
      <Container className="mt-4">
        <Row>
          <Col>
            <h1 className="text-center">About Us</h1>
            <h2 className="text-center fw-bold mt-3 fs-1"><span className="text-center fw-normal">This is a </span>PCI TECHNICAL ASSESSMENT</h2>
            <div className="my-5 col-lg-10 mx-auto shadow p-4 rounded" style={{ backgroundColor: "rgb(41, 60, 87)", color: "white" }}>
              <h3>Task Overview</h3>
              <p>
                Build an API Monitoring Dashboard that visually presents API request log data. The dashboard should display key metrics, charts/visual representations, and a detailed log table — all rendered from the provided JSON dataset.
              </p>
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
                    <td>HTML5, CSS3, TypeScript/JavaScript, React, Vite, Bootstrap, chart.js, react-router-dom</td>
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
            </div>

            <div className="my-5 col-lg-10 mx-auto shadow p-4 rounded" style={{ backgroundColor: "rgb(41, 60, 87)", color: "white" }} >
              <h4 className="text-center">Bonus features implemented</h4>
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
            </div>


            <div className="my-5 col-lg-10 mx-auto shadow p-4 rounded" style={{ backgroundColor: "rgb(41, 60, 87)", color: "white" }}>
              <h4>Here are brief and clear instructions to run this "React + Vite + TypeScript" project:</h4>
              <ol>
                <li>Clone the repository: <code className="text-warning">git clone https://github.com/ferralespereira/pci_assessment.git</code></li>
                <li>Navigate to the project directory: <code className="text-warning">cd pci_assessment</code></li>
                <li>Install dependencies: <code className="text-warning">npm install</code></li>
                <li>Start the development server: <code className="text-warning">npm run dev</code></li>
                <li>Open your browser and go to: <code className="text-warning">http://localhost:5173</code></li>
              </ol>
            </div>

            <div className="my-5 col-lg-10 mx-auto shadow p-4 rounded" style={{ backgroundColor: "rgb(41, 60, 87)", color: "white" }} >
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
                  <td>Vite</td>
                  <td>Faster development server, Optimized build process, Modern features support</td>
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

          <div className="my-5 col-lg-10 mx-auto shadow p-4 rounded" style={{ backgroundColor: "rgb(41, 60, 87)", color: "white" }} >
              <h4>Others</h4>
              <table className="table table-striped">
              <tbody>
                <tr>
                  <td className="fw-bold">Author</td>
                  <td>Javier Ferrales Pereira</td>
                </tr>
                <tr>
                  <td className="fw-bold">Hosting</td>
                  <td><a href="https://pci.javierfolder.com" target="_blank" rel="noopener noreferrer">https://pci.javierfolder.com</a></td>
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