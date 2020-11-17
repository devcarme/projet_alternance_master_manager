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

    const setRedirection = () => {
        var redirect = {lien: "/CandidaturesEtudiant"};
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(redirect)
        };
    
    fetch('http://localhost:9000/users/setRedirection', requestOptions)
        .then(res => res.json())
        .then(res => console.log(res.redirect))
    };

    useEffect(()=>{
        getCandidatures()
        setRedirection()
      },[])

        return (
            
            <div className="container-fluid p-0">
                <NavigatorEtudiant/>
                <br/>
                <Table striped bordered hover variant="dark">
                        <thead className="text-center">
                            <th><h3>Candidatures</h3></th>
                                <td colSpan="5">
                                    <div className="row justify-content-around pr-0 mb-2 mt-2">
                                        <Button variant="primary"  onClick={() => setModalAjoutCandidature(true)}><h5>Créer une candidature</h5></Button>
                                        <Button variant="primary"  onClick={() => setModalAjoutEntreprise(true)}><h5>Ajouter une entreprise</h5></Button>
                                        <Button variant="primary"  onClick={() => setModalAjoutEntretien(true)}><h5>Ajouter un entretien</h5></Button>
                                    </div>
                                </td>
                        </thead>
                        <thead className="text-center">
                            <tr>
                            <th>N°</th>
                            <th>Entreprise</th>
                            <th>Intitulé</th>
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

