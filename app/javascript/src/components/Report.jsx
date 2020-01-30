import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

import UsersReport from "../components/Reports/UsersReport";
import HoursReport from "../components/Reports/HoursReport";

export default function Report() {
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
          Users Report
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <UsersReport />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
          Hours Report
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <HoursReport />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
