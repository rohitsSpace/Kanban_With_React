import { React, useState } from "react";
import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Accordion, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const AddListItem = ({ onAddItem }) => {
  const [item, setItem] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(item);
    setItem(null);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setItem({
      id: uuidv4(),
      name: e.target.value,
      createdAt: Date.now(),
      items: [],
    });
  };

  return (
    <Accordion className="my-2" defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0" variant="link">
          Add List
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Row className="align-items-center">
                <Col>
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    Add List item
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Enter List name"
                    onChange={handleOnChange}
                    value={item ? item.name.value : ""}
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

export default AddListItem;
