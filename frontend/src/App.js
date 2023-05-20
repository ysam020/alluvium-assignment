import { Container, Row } from "react-bootstrap";
import "./App.css";
import FeedbackForm from "./forms/FeedbackForm";

function App() {
  return (
    <div className="App">
      <Container fluid className="form-container">
        <Row className="form-header">
          <h1> Feedback Form</h1>
        </Row>
        <Row className="form-body">
          <FeedbackForm />
        </Row>
      </Container>
    </div>
  );
}

export default App;
