import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import logsData from "../api_logs.json";

// for the Pie and Bar charts
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// for filtering
import { useState } from "react";


interface ApiLog {
  id: number;
  date: string;
  endpoint: string;
  method: string;
  response_code: number;
  response_time_ms: number;
  message: string;
}

let logs: ApiLog[] = logsData;

function Dashboard() {
  
  
  // When filtering logs-----------------------------------------------------------initialize-----
  const [filterCode, setFilterCode] = useState<string>("all");

  logs = logsData; // Reset logs to original data before applying filter
  const filteredLogs =
    filterCode === "all"
      ? logs
      : logs.filter((log) => log.response_code === parseInt(filterCode));
  logs = filteredLogs; // Update the logs variable to reflect the filtered logs
  // When filtering logs-----------------------------------------------------------end-----


  const totalRequests = logs.length;

  const successfulRequests = logs.filter(
    (log) => log.response_code === 200
  ).length;

  const failedRequests = logs.filter((log) =>
    [404, 422, 429].includes(log.response_code)
  ).length;

  const averageResponseTime =
    logs.reduce((sum, log) => sum + log.response_time_ms, 0) /
    totalRequests;

  const endpointCount: Record<string, number> = {};
  logs.forEach((log) => {
    endpointCount[log.endpoint] =
      (endpointCount[log.endpoint] || 0) + 1;
  });

  const mostActiveEndpoint = Object.entries(endpointCount).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] || "N/A";



  // Chart part-----------------------------------initialize----

  const responseCodes = [200, 404, 422, 429];
  const pieData = {
    labels: responseCodes.map((code) => code.toString()),
    datasets: [
      {
        label: "Requests by Response Code",
        data: responseCodes.map(
          (code) => logs.filter((l) => l.response_code === code).length
        ),
        backgroundColor: ["#28a745", "#dc3545", "#ffc107", "#17a2b8"], // green, red, yellow, blue
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };
  // Chart part-----------------------------------end----


  // Bar Chart part-----------------------------------initialize----

  // Group logs by day (YYYY-MM-DD)
  const requestsPerDay: Record<string, number> = {};

  logs.forEach((log) => {
    const day = new Date(log.date).toISOString().split("T")[0]; // e.g., "2025-02-20"
    requestsPerDay[day] = (requestsPerDay[day] || 0) + 1;
  });

  // Prepare data for the Bar chart
  const barData = {
    labels: Object.keys(requestsPerDay), // days
    datasets: [
      {
        label: "Requests per Day",
        data: Object.values(requestsPerDay),
        backgroundColor: "#007bff", // blue bars
      },
    ],
  };

  // Bar Chart part-----------------------------------end----



  return (
    <Container className="mt-4">
      {/* KPI Cards */}
      <Row className="mb-4">        
        <Col md={3} className="mb-3">
          <Card className="bg-dark text-white">
            <Card.Body>
              <Card.Title>Total Requests</Card.Title>
              <h3>{totalRequests}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="bg-success text-white">
            <Card.Body>
              <Card.Title>Successful (200)</Card.Title>
              <h3>{successfulRequests}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="bg-danger text-white">
            <Card.Body>
              <Card.Title>Failed</Card.Title>
              <h3>{failedRequests}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="bg-info text-black">
            <Card.Body>
              <Card.Title>Avg Response Time</Card.Title>
              <h3>{averageResponseTime.toFixed(2)} ms</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Most Active Endpoint */}
      <Row>
        <Col md={6} className="mx-auto">
          <Card className="mb-4 bg-secondary text-white text-center p-3">
            <Card.Body>
              <Card.Title>Most Active Endpoint</Card.Title>
              <h5>"{mostActiveEndpoint}"</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Render Pie and Bar Chart------------------ini---- */}
      <Row className="my-4">
       {/* Render Pie Chart */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Requests by Response Code</Card.Title>
              <Pie data={pieData} />
            </Card.Body>
          </Card>
        </Col>

        {/* Render Bar Chart */}
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Requests per Day</Card.Title>
              <Bar data={barData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Render Pie and Bar Chart------------------end---- */}


      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Endpoint</th>
            <th>Method</th>
            <th>
              Response codes
              <select
                className="form-select"
                value={filterCode}
                onChange={(e) => setFilterCode(e.target.value)}
              >
                <option value="all">All Response Codes</option>
                <option value="200">200 - OK</option>
                <option value="404">404 - Not Found</option>
                <option value="422">422 - Unprocessable Entity</option>
                <option value="429">429 - Too Many Requests</option>
              </select>
            </th>
            <th>Response Time</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{new Date(log.date).toLocaleString()}</td>
              <td>{log.endpoint}</td>
              <td>
                <Badge bg="primary">{log.method}</Badge>
              </td>
              <td align="center">
                <Badge
                  bg={
                    log.response_code === 200
                      ? "success"
                      : log.response_code === 404
                      ? "warning"
                      : log.response_code === 422
                      ? "secondary"
                      : log.response_code === 429
                      ? "danger"
                      : "secondary"
                  }
                  text={
                    log.response_code === 404
                      ? "black"
                      : "white"
                  }
                >
                  {log.response_code}
                </Badge>
              </td>
              <td>{log.response_time_ms} ms</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Dashboard;