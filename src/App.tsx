import { Container, Table, Badge } from 'react-bootstrap';
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
  const getStatusVariant = (code: number) => {
    if (code >= 200 && code < 300) return "success";
    if (code >= 400 && code < 500) return "warning";
    if (code >= 500) return "danger";
    return "secondary";
  };

  const getMethodVariant = (method: string) => {
    switch (method) {
      case "GET":
        return "primary";
      case "POST":
        return "success";
      case "PUT":
        return "warning";
      case "DELETE":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">API Logs</h2>

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