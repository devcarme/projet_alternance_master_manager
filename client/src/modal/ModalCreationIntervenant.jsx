import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap"
import AjoutIntervenantForm from "../form/AjoutIntervenantForm";


 
function ModalCreationIntervenant(props) {
  const [error, setError] = useState([]);
  
  const createIntervenant = (arrayIntervenant)  => {
    const requestOptions = {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(arrayIntervenant)
    };
    
    fetch('http://localhost:9000/users/insertIntervenant', requestOptions)
        .then(res => res.json())
        .then(res => {
          if(!res.ok){
            setError(res.message)
          }else{
            props.onHide
            window.location.reload()
          }
        }) 
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
            Ajouter un Intervenant
            <p className="text-danger">{error}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AjoutIntervenantForm onCreate={createIntervenant} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Annuler</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ModalCreationIntervenant;