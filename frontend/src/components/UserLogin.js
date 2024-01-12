import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const UserLogin = () => {
  return (
    <div className="user-login">
      <Container className="col-4-md">
        <Form>
          <Form.Group controlId="email">
            <Row>
              <Col className="col-3">
                <Form.Label>Email</Form.Label>
              </Col>
              <Col>
                <Form.Control type="email" placeholder="enter your Email" />
                {/* <Form.Text className="text-muted">enter your Email</Form.Text> */}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mt-2" controlId="password">
            <Row>
              <Col className="col-3">
                <Form.Label>Password</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="enter your Password"
                />
              </Col>
            </Row>
          </Form.Group>
          <Button className="mt-2" variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default UserLogin;
