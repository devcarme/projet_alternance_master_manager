import React from "react";
import { Modal, Button } from "react-bootstrap"
import AjoutCandidatureForm from "../form/AjoutCandidatureForm";


 
function ModalCreationCandidature(props) {
  
  const createCandidature = (arrayCandidature)  => {
    const requestOptions = {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(arrayCandidature)
    };
    
    fetch('http://localhost:9000/users/insertCandidature', requestOptions)
        .then(res => res.text())
        .then(res => console.log(res))
        .then(props.onHide)
        .then(window.location.reload())
    };

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Créer une candidature
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AjoutCandidatureForm onCreate={createCandidature} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Annuler</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ModalCreationCandidature;