import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ModalUI from "../components/UI/Modal";
import Alert from "react-bootstrap/Alert";

import createUser from "../services/createUser";

export default function Registration() {
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [messageAlert, setMessageAlert] = React.useState("");

  const [showModal, setShowModal] = React.useState(false);

  function handleClose() {
    setMessageAlert("");
    setShowAlert(false);
    setShowModal(false);
  }

  function handleGenderOnChange(e) {
    setGender(e.target.value);
  }

  function handleOnSubmit(event) {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setShowModal(true);
    }

    setValidated(true);
  }
  function handleConfirmSave() {
    createUser({
      user: {
        name: name,
        last_name: lastName,
        email: email,
        password_digest: password,
        gender: gender,
        role: `${isAdmin ? "admin" : "employee"}`
      }
    })
      .then(result => {
        if (result.errors) {
          setMessageAlert(result.errors.toString());
          setShowAlert(true);
        } else {
          handleClose();
          reset();
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  function reset() {
    setEmail("");
    setPassword("");
    setGender("");
    setName("");
    setLastName("");
    setMessageAlert("");
    setShowAlert(false);
    setIsAdmin(false);
    setValidated(false);
  }

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Form
        onSubmit={handleOnSubmit}
        id="newUserForm"
        noValidate
        validated={validated}
      >
        <Form.Group as={Row} controlId="formHorizontalName">
          <Form.Label column sm={4}>
            Name
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              placeholder="Name"
              autoFocus
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Name is missing.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalLastName">
          <Form.Label column sm={4}>
            Last Name
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              placeholder="Last Name"
              value={lastName}
              onChange={e => {
                setLastName(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Last Name is missing.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={4}>
            Email
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Invalid email format or Email missing.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={4}>
            Initial Password
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Password is missing.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={4}>
              Gender
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              Gender not selected
            </Form.Control.Feedback>
            <Col sm={8}>
              <Form.Check
                type="radio"
                label="male"
                name="formRadios"
                id="radios1"
                value="male"
                checked={gender === "male"}
                onChange={handleGenderOnChange}
              />
              <Form.Check
                type="radio"
                label="female"
                name="formRadios"
                id="radios2"
                value="female"
                checked={gender === "female"}
                onChange={handleGenderOnChange}
              />
              <Form.Check
                type="radio"
                label="reserved"
                name="formRadios"
                id="radios3"
                value="undefined"
                checked={gender === "reserved"}
                onChange={handleGenderOnChange}
                required
              />
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row} controlId="formHorizontalCheck">
          <Col sm={{ span: 8, offset: 4 }}>
            <Form.Check
              label="Admin"
              value={isAdmin}
              onChange={() => {
                setIsAdmin(!isAdmin);
                noValidate;
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 8, offset: 4 }} className="buttonArea">
            <Button type="submit">Register</Button>
            <Button variant="outline-primary" type="button" onClick={reset}>
              Reset
            </Button>
          </Col>
        </Form.Group>
      </Form>
      {showModal && (
        <ModalUI
          handleClose={handleClose}
          handleSubmit={handleConfirmSave}
          buttonLabel="Confirm"
          headerLabel="New Employee"
        >
          <p>Please, confirm the following information:</p>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="4" style={{ color: "#28a745" }}>
                Name
              </Form.Label>
              <Col sm="6">
                <Form.Control plaintext readOnly defaultValue={name} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4" style={{ color: "#28a745" }}>
                Last Name
              </Form.Label>
              <Col sm="6">
                <Form.Control plaintext readOnly defaultValue={lastName} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4" style={{ color: "#28a745" }}>
                Email
              </Form.Label>
              <Col sm="6">
                <Form.Control plaintext readOnly defaultValue={email} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4" style={{ color: "#28a745" }}>
                Password
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  plaintext
                  readOnly
                  type="password"
                  defaultValue={password}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4" style={{ color: "#28a745" }}>
                Gender
              </Form.Label>
              <Col sm="6">
                <Form.Control plaintext readOnly defaultValue={gender} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4" style={{ color: "#28a745" }}>
                Role
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={isAdmin ? "admin" : "Employee"}
                />
              </Col>
            </Form.Group>
          </Form>
          {showAlert && (
            <Alert
              variant={"danger"}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {messageAlert}
            </Alert>
          )}
        </ModalUI>
      )}
    </Container>
  );
}
