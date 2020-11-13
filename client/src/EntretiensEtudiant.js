import React, { useState, useEffect } from "react";
import "./css/App.css";
import NavigatorEtudiant from "./nav/NavigatorEtudiant";
import EntretienDetails from "./details/EntretienDetails";
import ModalCreationCandidature from "./modal/ModalCreationCandidature";
import ModalCreationEntreprise from "./modal/ModalCreationEntreprise";
import "./css/index.css";
import { Table, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCreationEntretien from "./modal/ModalCreationEntretien";

function EntretiensEtudiants (props) {
    const [candidatures, setCandidatures] = useState([]);
    const [entretiens, setEntretiens] = useState([]);
    const [modalAjoutCandidature, setModalAjoutCandidature] = useState(false);
    const [modalAjoutEntreprise, setModalAjoutEntreprise] = useState(false);
    const [modalAjoutEntretien, setModalAjoutEntretien] = useState(false);

    const getCandidatures = () => {
        fetch("http://localhost:9000/users/getCandidatures")
            .then((res) => res.json())
            .then(res => setCandidatures(res))
            .catch(err => err);
    }

    const getEntretiens = () => {
        fetch("http://localhost:9000/users/getEntretiens")
            .then((res) => res.json())
            .then(res => setEntretiens(res))
            .catch(err => err);
    }

    useEffect(()=>{
        getCandidatures();
        getEntretiens();
      },[])

        return (
            
            <div>
                <NavigatorEtudiant/>
                <br/>
                <div className="row justify-content-around">
                    <Button variant="primary" className="mb-3" onClick={() => setModalAjoutEntretien(true)}>Ajouter un entretien</Button>
                </div>
                <Table striped bordered hover variant="dark">
                        <thead><th><h3>Entretiens</h3></th></thead>
                        <thead>
                            <tr>
                            <th>N°</th>
                            <th>Date</th>
                            <th>Organisé par l'UBO</th>
                            <th>Personnel</th>
                            <th>Annulé</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entretiens.map(entretien => (
                                <EntretienDetails
                                key={entretien.idEntretien}
                                details={entretien}
                                />
                            ))}
                        </tbody>
                    </Table>
                    <ModalCreationEntretien
                        show={modalAjoutEntretien}
                        onHide={() => setModalAjoutEntretien(false)}
                    />      
            </div>
            
        );
}

export default EntretiensEtudiants;

