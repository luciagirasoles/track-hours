import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { navigate } from "@reach/router";
import { logout } from "../services/fetchLogin";
export default function Navigation({ user }) {
  function handleOnClick() {
    logout().then(() => {
      navigate("/");
    });
  }
  return (
    <Navbar expand="lg" bg="light" fixed="top">
      <Navbar.Brand>Track Hours</Navbar.Brand>
      <Navbar.Text>{`${user.name}`}</Navbar.Text>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Button
          style={{ marginLeft: "5px" }}
          variant="outline-success"
          type="button"
          onClick={handleOnClick}
        >
          Log Out
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
