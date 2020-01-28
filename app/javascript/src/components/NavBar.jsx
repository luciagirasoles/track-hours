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
    <Navbar bg="light" fixed="top">
      <Navbar.Brand>Track Hours</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>{`${user.name}`}</Navbar.Text>
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
