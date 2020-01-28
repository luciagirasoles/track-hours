import React from "react";

import Admin from "../components/Admin";
import Employee from "../components/Employee";
import Navigation from "../components/NavBar";
import { Redirect } from "@reach/router";
import { useUserState } from "../contexts/userContext";
import Container from "react-bootstrap/Container";

export default function Dashboard() {
  const user = useUserState();

  if (!user) return <Redirect to="/" noThrow />;
  return (
    <>
      <Container>
        <Navigation user={user} />
      </Container>
      {user.role == "admin" ? <Admin /> : <Employee />}
    </>
  );
}
