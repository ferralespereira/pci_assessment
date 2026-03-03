import { Button, Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import logsData from "../api_logs.json";
import Layout from "../components/Layout";

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



// Helper Function to download CSV-----
const exportToCsv = (logs: ApiLog[], filename = "logs.csv") => {
  if (!logs.length) return;

  const headers = Object.keys(logs[0]);
  const rows = logs.map((log) =>
    headers.map((key) => `"${(log as any)[key]}"`).join(",")
  );
  const csvContent = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};



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

  // Sort by ID by default in ascending order------------------
  /*
    the default sorting is by "id" in ascending order, 
    but when you click on a table header, 
    it will change the sorting field and direction accordingly
  */
  const [sortField, setSortField] = useState<keyof ApiLog>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Handle sorting (function calling when clicking on table headers)------
  const handleSort = (field: keyof ApiLog) => {
    if (sortField === field) {
      // if you are already sorting by this field, change the direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // if you are sorting by a different field, start sorting by this new field in ascending order
      setSortField(field);
      setSortDirection("asc");
    }
  };



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


  // before the render it is going to sort the logs based on the current sortField and sortDirection
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    // Special case for date
    if (sortField === "date") {
      valueA = new Date(a.date).getTime();
      valueB = new Date(b.date).getTime();
    }

    if (typeof valueA === "string") {
      valueA = valueA.toLowerCase();
      valueB = (valueB as string).toLowerCase();
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });



  return (
    <Layout>
      <Container className="mt-4">

        {/* Dark/Light Mode Toggle */}
        <Row className="mb-3 justify-content-end">
          
          <Col md="auto">
              <Button
              variant="primary"
              onClick={() => exportToCsv(filteredLogs)}
              className="mb-3"
            >
              Export Table to CSV <i className="bi bi-download"></i>
            </Button>
          </Col>
        </Row>


        {/* KPI Cards */}
        <Row className="mb-4 justify-content-center">        
          <Col lg={3} className="mb-3 shadow p-2 border rounded">
            <Card className="bg-dark text-white border borer-light">
              <Card.Body>
                <Card.Title>Total Requests</Card.Title>
                <h3>{totalRequests}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={2} className="mb-3 shadow p-2 border rounded mx-md-2">
            <Card className="bg-success text-white">
              <Card.Body>
                <Card.Title>Successful (200)</Card.Title>
                <h3>{successfulRequests}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={2} className="mb-3 shadow p-2 border rounded mx-md-2">
            <Card className="bg-danger text-white">
              <Card.Body>
                <Card.Title>Failed</Card.Title>
                <h3>{failedRequests}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} className="mb-3 shadow p-2 border rounded">
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
            <Card className="mb-4 bg-secondary text-white text-center p-3 border rounded shadow">
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
          <Col md={8} className="mt-2 mt-md-0">
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
              <th onClick={() => handleSort("id")} style={{ cursor: "pointer", width: "50px" }}>
                {sortField === "id" ?
                    sortDirection === "asc" ? 
                      <i className="bi bi-arrow-up">Id</i> 
                    : 
                      <i className="bi bi-arrow-down">Id</i>
                  : "Id"
                }
              </th>
              <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                {sortField === "date" ?
                    sortDirection === "asc" ? 
                      <i className="bi bi-arrow-up">Date</i> 
                    : 
                      <i className="bi bi-arrow-down">Date</i>
                  : "Date"
                }
              </th>
              <th onClick={() => handleSort("endpoint")} style={{ cursor: "pointer" }}>
                {sortField === "endpoint" ?
                    sortDirection === "asc" ? 
                      <i className="bi bi-arrow-up">Endpoint</i> 
                    : 
                      <i className="bi bi-arrow-down">Endpoint</i>
                  : "Endpoint"
                }
              </th>
              <th onClick={() => handleSort("method")} style={{ cursor: "pointer" }}>
                {sortField === "method" ?
                    sortDirection === "asc" ? 
                      <i className="bi bi-arrow-up">Method</i> 
                    : 
                      <i className="bi bi-arrow-down">Method</i>
                  : "Method"
                }
              </th>
              <th>
                {/* Response codes */}
                <select
                  className="form-select fw-bold"
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
              <th onClick={() => handleSort("response_time_ms")} style={{ cursor: "pointer" }}>
                {sortField === "response_time_ms" ?
                    sortDirection === "asc" ? 
                      <i className="bi bi-arrow-up">Response Time</i> 
                    : 
                      <i className="bi bi-arrow-down">Response Time</i>
                  : "Response Time"
                }
              </th>
              <th onClick={() => handleSort("message")} style={{ cursor: "pointer" }}>
                {sortField === "message" ?
                    sortDirection === "asc" ? 
                      <i className="bi bi-arrow-up">Message</i> 
                    : 
                      <i className="bi bi-arrow-down">Message</i>
                  : "Message"
                }
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedLogs.map((log) => (
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
    </Layout>
  );
}

export default Dashboard;