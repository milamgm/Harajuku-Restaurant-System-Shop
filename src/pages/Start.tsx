import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/UseStateContext";

const Start = () => {
  let navigate = useNavigate();
  let { setTableNum } = useCartContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableNum(e.target[0].value);
    navigate("/");
  };
  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Table Number</Form.Label>
          <Form.Control type="number" required />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formPlace"
          name="place"
          required
        >
          <Form.Label>Indoor / Outdoor</Form.Label>
          <Form.Check
            type="radio"
            label="Indoor"
            name="place"
            defaultChecked
            value="indoor"
          />
          <Form.Check
            type="radio"
            label="Outdoor"
            name="place"
            value="outdoor"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Start;
