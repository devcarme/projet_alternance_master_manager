import React, { useState, useEffect } from "react";
import "./css/App.css";
import NavigatorEtudiant from "./nav/NavigatorEtudiant";
import EntretienDetails from "./details/EntretienDetails";
import "./css/index.css";
import { Table, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCreationEntretien from "./modal/ModalCreationEntretien";
import ModalCreationIntervenant from "./modal/ModalCreationIntervenant";


function EntretiensEtudiant (props) {
    const [candidatures, setCandidatures] = useState([]);
    const [entretiens, setEntretiens] = useState([]);
    const [modalAjoutIntervenant, setModalAjoutIntervenant] = useState(false);
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

    const setRedirection = (redirection) => {
        var redirect = {lien: redirection};
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
        getEntretiens()
        setRedirection("/EntretiensEtudiant")
      },[])

        return (
            
            <div>
                <NavigatorEtudiant/>
                <br/>
                <Table striped bordered hover variant="dark">
                        <thead className="text-center"><th><h3>Entretiens</h3></th>
                            <td colSpan="6">
                                <div className="row justify-content-around mb-2 mt-2">
                                    <Button variant="primary" onClick={() => setModalAjoutEntretien(true)}><h5>Ajouter un entretien</h5></Button>
                                    <Button variant="primary" onClick={() => setModalAjoutIntervenant(true)}><h5>Ajouter un intervenant</h5></Button>
                                </div>
                            </td>
                        </thead>
                        <thead className="text-center">
                            <tr>
                            <th>N°</th>
                            <th>Date</th>
                            <th>Heure</th>
                            <th>Intervenant</th>
                            <th>Entreprise</th>
                            <th>Organisé par l'UBO</th>
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
                    <ModalCreationIntervenant
                        show={modalAjoutIntervenant}
                        onHide={() => setModalAjoutIntervenant(false)}
                    />      
            </div>
            
        );
}

export default EntretiensEtudiant;

