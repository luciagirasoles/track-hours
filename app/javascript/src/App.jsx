import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";
// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./contexts/userContext";

const Login = React.lazy(() => import("./views/Login"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));

export default function App() {
  return (
    <Jumbotron
      className="d-flex align-items-center justify-content-center"
      style={{
        marginBottom: "0px"
      }}
    >
      <React.Suspense fallback={<Spinner animation="border" />}>
        <UserProvider>
          <Router>
            <Login path="/" />
            <Dashboard path="/admin" />
            <Dashboard path="/employee" />
          </Router>
        </UserProvider>
      </React.Suspense>
    </Jumbotron>
  );
}
