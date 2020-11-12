import React from "react";
import { Modal, Button } from "react-bootstrap"
import AjoutEntrepriseForm from "../form/AjoutEntrepriseForm";


 
function ModalCreationEntreprise(props) {
  
  const createEntreprise = (arrayEntreprise)  => {
    var nom = arrayEntreprise.nomEntreprise;
    var adresse = arrayEntreprise.adresseEntreprise;  
    var entreprise = {nomEntreprise: nom, adresseEntreprise: adresse};
    const requestOptions = {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(entreprise)
    };
    
    fetch('http://localhost:9000/users/insertEntreprise', requestOptions)
        .then(res => res.text())
        .then(res => console.log(res))
        .then(props.onHide)
        .then(window.location.reload())
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Créer une entreprise
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AjoutEntrepriseForm onCreate={createEntreprise} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Annuler</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ModalCreationEntreprise;