import React from "react";
import { Modal, Button } from "react-bootstrap"
import AjoutEntretienForm from "../form/AjoutEntretienForm";


 
function ModalCreationEntretien(props) {
  
  const createEntretien = (arrayEntretien)  => {
    const requestOptions = {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(arrayEntretien)
    };
    
    fetch('http://localhost:9000/users/insertEntretien', requestOptions)
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
            Ajouter un Entretien
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AjoutEntretienForm onCreate={createEntretien} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Annuler</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ModalCreationEntretien;