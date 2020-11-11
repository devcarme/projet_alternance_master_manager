import React from "react";
import { Modal, Button } from "react-bootstrap"

 
 
function ModalCreationCandidature(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Créer une candidature
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Formulaire d'ajout
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Créer</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ModalCreationCandidature;