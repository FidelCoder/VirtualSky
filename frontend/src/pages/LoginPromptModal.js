import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const LoginPromptModal = ({ isOpen, toggle, redirectToAuth }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Access Restricted</ModalHeader>
      <ModalBody>
        <p>You must be logged in to access this page.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={redirectToAuth}>
          Login
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LoginPromptModal;
