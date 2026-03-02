import { Container, Table, Badge, Row, Col, Card } from 'react-bootstrap';
import logsData from './api_logs.json';

interface LogEntry {
  id: number;
  date: string;
  endpoint: string;
  method: string;
  response_code: number;
  response_time_ms: number;
  message: string;
}

const logs: LogEntry[] = logsData;

function App(): JSX.Element {
  // Calculations
  const totalRequests = logs.length;

  const avgResponseTime =
    logs.reduce((sum, log) => sum + log.response_time_ms, 0) /
    totalRequests;

  const fastest = Math.min(...logs.map(log => log.response_time_ms));
  const slowest = Math.max(...logs.map(log => log.response_time_ms));

  const getStatusVariant = (code: number) => {
    if (code >= 200 && code < 300) return "success";
    if (code >= 400 && code < 500) return "warning";
    if (code >= 500) return "danger";
    return "secondary";
  };

  const getMethodVariant = (method: string) => {
    switch (method) {
      case "GET": return "primary";
      case "POST": return "success";
      case "PUT": return "warning";
      case "DELETE": return "danger";
      default: return "secondary";
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">API Logs Dashboard</h2>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card bg="primary" text="white" className="shadow">
            <Card.Body>
              <Card.Title>Total Requests</Card.Title>
              <Card.Text style={{ fontSize: "1.8rem" }}>
                {totalRequests}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card bg="success" text="white" className="shadow">
            <Card.Body>
              <Card.Title>Avg Response Time</Card.Title>
              <Card.Text style={{ fontSize: "1.8rem" }}>
                {avgResponseTime.toFixed(2)} ms
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card bg="info" text="white" className="shadow">
            <Card.Body>
              <Card.Title>Fastest</Card.Title>
              <Card.Text style={{ fontSize: "1.8rem" }}>
                {fastest} ms
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card bg="danger" text="white" className="shadow">
            <Card.Body>
              <Card.Title>Slowest</Card.Title>
              <Card.Text style={{ fontSize: "1.8rem" }}>
                {slowest} ms
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Logs Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Endpoint</th>
            <th>Method</th>
            <th>Status</th>
            <th>Response Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{new Date(log.date).toLocaleString()}</td>
              <td>{log.endpoint}</td>
              <td>
                <Badge bg={getMethodVariant(log.method)}>
                  {log.method}
                </Badge>
              </td>
              <td>
                <Badge bg={getStatusVariant(log.response_code)}>
                  {log.response_code}
                </Badge>
              </td>
              <td>{log.response_time_ms}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;