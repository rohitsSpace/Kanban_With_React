import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import List from "./components/List";
import usePageTitle from "../src/hooks/usePageTitle";

const App = () => {
  usePageTitle("Kanban App");
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <List />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
