import React from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { navigate } from "@reach/router";

import { login } from "../services/fetchLogin";
import { useUserDispatch, useUserState } from "../contexts/userContext";

export default function Login() {
  const [showAlert, setShowAlert] = React.useState(false);
  const [messageAlert, setMessageAlert] = React.useState("");
  const [validated, setValidated] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useUserDispatch();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      login({ email, password }).then(result => {
        if (result.errors) {
          setMessageAlert(result.errors);
          setShowAlert(true);
        } else {
          dispatch({ type: "setUser", payload: result });
          navigate(`/${result.role}`);
        }
      });
    }
    setValidated(true);
  }
  function reset() {
    document.getElementById("loginForm").reset();
    setMessageAlert("");
    setShowAlert(false);
    setValidated(false);
  }

  return (
    <Card border="light" style={{ minWidth: "40vw" }}>
      <Card.Body>
        <Card.Title className="text-center">Login</Card.Title>
        <Form
          id="loginForm"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              required
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              Invalid email format or Email missing.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              autoComplete="on"
            />
            <Form.Control.Feedback type="invalid">
              Password is missing
            </Form.Control.Feedback>
          </Form.Group>

          {showAlert && (
            <Alert
              variant={"danger"}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {messageAlert}
            </Alert>
          )}
          <div className="buttonArea">
            <Button variant="success" type="submit" size="md">
              Access
            </Button>
            <Button
              variant="outline-primary"
              type="button"
              onClick={reset}
              size="md"
            >
              Reset
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
