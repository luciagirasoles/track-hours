import React from "react";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Report from "./Report";
import Registration from "./Registration";
export default function Admin() {
  const [key, setKey] = React.useState("Reports");
  return (
    <Card border="light" style={{ width: "90vw", marginTop: "85px" }}>
      <Card.Body>
        <Card.Title>Admin</Card.Title>
        <Tabs activeKey={key} onSelect={key => setKey(key)}>
          <Tab eventKey="Reports" title="Reports">
            {key === "Reports" && <Report />}
          </Tab>
          <Tab eventKey="Home" title="Create User">
            {key === "Home" && <Registration />}
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
}
