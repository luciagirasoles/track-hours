import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export default function ModalUI({
  children,
  handleClose,
  handleSubmit,
  headerLabel = "",
  buttonLabel = "submit"
}) {
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{headerLabel}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {buttonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
