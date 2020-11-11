import React, { useState, useEffect } from "react";
import "./css/App.css";
import NavigatorEtudiant from "./NavigatorEtudiant";
import CandidatureDetails from "./CandidatureDetails";
import ModalCreationCandidature from "./ModalCreationCandidature";
import "./css/index.css";
import { Table, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CandidaturesEtudiant (props) {
    const [candidatures, setCandidatures] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const getCandidatures = () => {
        fetch("http://localhost:9000/users/getCandidatures")
            .then((res) => res.json())
            .then(res => setCandidatures(res))
            .catch(err => err);
    }

    useEffect(()=>{
        getCandidatures()
      },[])

        return (
            
            <div>
                <NavigatorEtudiant/>
                <br/>
                <Button variant="primary" className="mb-3" onClick={() => setModalShow(true)}>Créer une candidature</Button>
                <Table striped bordered hover variant="dark">
                        <thead><th><h3>Candidatures</h3></th></thead>
                        <thead>
                            <tr>
                            <th>N°</th>
                            <th>Entreprise</th>
                            <th>Documents</th>
                            <th>Origine de l'offre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidatures.map(candidature => (
                                <CandidatureDetails
                                key={candidature.idCandidature}
                                details={candidature}
                                />
                            ))}
                        </tbody>
                    </Table>
                    <ModalCreationCandidature
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />   
            </div>
            
        );
}

export default CandidaturesEtudiant;

