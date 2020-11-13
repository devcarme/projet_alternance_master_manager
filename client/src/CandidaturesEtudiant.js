import React, { useState, useEffect } from "react";
import "./css/App.css";
import NavigatorEtudiant from "./nav/NavigatorEtudiant";
import CandidatureDetails from "./details/CandidatureDetails";
import ModalCreationCandidature from "./modal/ModalCreationCandidature";
import ModalCreationEntreprise from "./modal/ModalCreationEntreprise";
import { Table, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/index.css";
import ModalCreationEntretien from "./modal/ModalCreationEntretien";

function CandidaturesEtudiant (props) {
    const [candidatures, setCandidatures] = useState([]);
    const [modalAjoutCandidature, setModalAjoutCandidature] = useState(false);
    const [modalAjoutEntreprise, setModalAjoutEntreprise] = useState(false);
    const [modalAjoutEntretien, setModalAjoutEntretien] = useState(false);

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
            
            <div class="container-fluid p-0">
                <NavigatorEtudiant/>
                <br/>
                <div className="row justify-content-around pr-0">
                    <Button variant="primary" className="mb-3" onClick={() => setModalAjoutCandidature(true)}>Créer une candidature</Button>
                    <Button variant="primary" className="mb-3" onClick={() => setModalAjoutEntreprise(true)}>Ajouter une entreprise</Button>
                    <Button variant="primary" className="mb-3" onClick={() => setModalAjoutEntretien(true)}>Ajouter un entretien</Button>
                </div>
                <Table striped bordered hover variant="dark">
                        <thead><th><h3>Candidatures</h3></th></thead>
                        <thead>
                            <tr>
                            <th>N°</th>
                            <th>Entreprise</th>
                            <th>Documents</th>
                            <th>Origine de l'offre</th>
                            <th>Entretien</th>
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
                        show={modalAjoutCandidature}
                        onHide={() => setModalAjoutCandidature(false)}

                    />
                    <ModalCreationEntreprise
                        show={modalAjoutEntreprise}
                        onHide={() => setModalAjoutEntreprise(false)}
                    />
                    <ModalCreationEntretien
                        show={modalAjoutEntretien}
                        onHide={() => setModalAjoutEntretien(false)}
                    />      
            </div>
            
        );
}

export default CandidaturesEtudiant;

