import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Accordion, Card } from "react-bootstrap";

const AddCard = ({ onAddItem }) => {
  const [content, setContent] = useState("");
  return (
    <Accordion className="mb-2" defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Add Card to the list
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form
              onSubmit={(e) => {
                onAddItem(content);
              }}
            >
              <Form.Row className="align-items-center">
                <Col>
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    Add Card
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Enter card content"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    type="text"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit" className="mb-2">
                    Create
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default AddCard;
