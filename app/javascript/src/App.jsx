import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./contexts/userContext";

const Login = React.lazy(() => import("./views/Login"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));

export default function App() {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{
        margin: "0px",
        border: "0px",
        padding: "0px",
        background: "linear-gradient(156.22deg, #73c056 1.35%, #34a9b0 92.72%)",
        minHeight: "-webkit-fill-available",
        height: "100vh"
      }}
    >
      <Row>
        <Col>
          <React.Suspense fallback={<Spinner animation="border" />}>
            <UserProvider>
              <Router>
                <Login path="/" />
                <Dashboard path="/admin" />
                <Dashboard path="/employee" />
              </Router>
            </UserProvider>
          </React.Suspense>
        </Col>
      </Row>
    </Container>
  );
}
