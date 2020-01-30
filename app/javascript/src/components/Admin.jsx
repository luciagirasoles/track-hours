import React from "react";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Report from "./Report";
import Registration from "./Registration";
export default function Admin() {
  return (
    <Card border="light" style={{ width: "90vw", marginTop: "85px" }}>
      <Card.Body>
        <Card.Title>Admin</Card.Title>
        <Tabs defaultActiveKey="home">
          <Tab eventKey="home" title="Create User">
            <Registration />
          </Tab>
          <Tab eventKey="Report" title="Report">
            <Report />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
}
