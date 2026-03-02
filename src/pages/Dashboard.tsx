import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import logsData from "../api_logs.json";

interface ApiLog {
  id: number;
  date: string;
  endpoint: string;
  method: string;
  response_code: number;
  response_time_ms: number;
  message: string;
}

const logs: ApiLog[] = logsData;

function Dashboard() {
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

  return (
    <Container className="mt-4">
      {/* KPI Cards */}
      <Row className="mb-4">        
        <Col md={3}>
          <Card className="bg-dark text-white">
            <Card.Body>
              <Card.Title>Total Requests</Card.Title>
              <h3>{totalRequests}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="bg-success text-white">
            <Card.Body>
              <Card.Title>Successful (200)</Card.Title>
              <h3>{successfulRequests}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="bg-danger text-white">
            <Card.Body>
              <Card.Title>Failed</Card.Title>
              <h3>{failedRequests}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
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
          <Card className="mb-4 bg-secondary text-white p-3">
            <Card.Body>
              <Card.Title>Most Active Endpoint</Card.Title>
              <h5>{mostActiveEndpoint}</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Endpoint</th>
            <th>Method</th>
            <th>Status</th>
            <th>Response Time</th>
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
              <td>
                <Badge
                  bg={log.response_code === 200 ? "success" : "danger"}
                >
                  {log.response_code}
                </Badge>
              </td>
              <td>{log.response_time_ms} ms</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Dashboard;