import React from "react";
import { Modal, Button } from "react-bootstrap"
import AjoutCandidatureForm from "../form/AjoutCandidatureForm";


 
function ModalCreationCandidature(props) {
  
  const createCandidature = (arrayCandidature)  => {
    var entreprise = arrayCandidature.idEntreprise;
    var origineOffreValue = arrayCandidature.origineOffre;
    var cv = arrayCandidature.idCV;
    var entretien = arrayCandidature.idEntretien;
    var lettreMotivation = arrayCandidature.idLettreMotivation;  
    var candidature = {idEntreprise: entreprise, origineOffre: origineOffreValue, idCV: cv, idEntretien: entretien, idLettreMotivation: lettreMotivation};
    const requestOptions = {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(candidature)
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
        <AjoutCandidatureForm onCreate={createCandidature} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Annuler</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ModalCreationCandidature;