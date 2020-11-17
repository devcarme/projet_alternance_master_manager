import React, { useState, useEffect } from "react";
import "./css/App.css";
import NavigatorEtudiant from "./nav/NavigatorEtudiant";
import CVDetails from "./details/CVDetails";
import LMDetails from "./details/LMDetails";
import "./css/index.css";
import { Table, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCreationCV from "./modal/ModalCreationCV";
import ModalCreationLM from "./modal/ModalCreationLM";
import CVSelect from "./select/CVSelect";


function DocumentsEtudiant (props) {
    const [cvs, setCVS] = useState([]);
    const [lms, setLMS] = useState([]);
    const [modalAjoutCV, setModalAjoutCV] = useState(false);
    const [modalAjoutLM, setModalAjoutLM] = useState(false);

    const getCVS = () => {
        fetch("http://localhost:9000/users/getCVS")
            .then((res) => res.json())
            .then(res => setCVS(res))
            .catch(err => err);
    }

    const getLMS = () => {
        fetch("http://localhost:9000/users/getLMS")
            .then((res) => res.json())
            .then(res => setLMS(res))
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
        getCVS()
        getLMS()
        setRedirection("/DocumentsEtudiant")
      },[])

        return (
            <div>
                <NavigatorEtudiant/>
                <br/>
                <div className="row justify-content">
                    <div  className="col">
                        <Table striped bordered hover variant="dark">
                                <thead className="text-center"><th><h3>CV</h3></th>
                                    <td colSpan="6">
                                        <div className="row justify-content-around mb-2 mt-2">
                                            <Button variant="primary" onClick={() => setModalAjoutCV(true)}><h5>Ajouter un CV</h5></Button>
                                        </div>
                                    </td>
                                </thead>
                                <thead className="text-center">
                                    <tr>
                                    <th>N°</th>
                                    <th>Lien</th>
                                    <th>Observations</th>
                                    <th>Validé</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cvs.length == 0
                                        ? <td colSpan="4" className="text-center">Aucun CV</td>
                                        : cvs.map(cv => (<CVDetails key={cv.idCV} details={cv} />))          
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <div className="col">
                            <Table striped bordered hover variant="dark">
                                <thead className="text-center"><th><h3>LM</h3></th>
                                    <td colSpan="6">
                                        <div className="row justify-content-around mb-2 mt-2">
                                            <Button variant="primary" onClick={() => setModalAjoutLM(true)}><h5>Ajouter une lettre de motivation</h5></Button>
                                        </div>
                                    </td>
                                </thead>
                                <thead className="text-center">
                                    <tr>
                                    <th>N°</th>
                                    <th>Lien</th>
                                    <th>Commentaires</th>
                                    <th>Validé</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lms.length == 0
                                        ? <td colSpan="4" className="text-center">Aucune lettre de motivation</td>
                                        : lms.map(lm => (<LMDetails key={lm.idCV} details={lm} />))          
                                    }
                                </tbody>
                            </Table>
                         </div>
                    </div>
                    <ModalCreationCV
                        show={modalAjoutCV}
                        onHide={() => setModalAjoutCV(false)}
                    />
                    <ModalCreationLM
                        show={modalAjoutLM}
                        onHide={() => setModalAjoutLM(false)}
                    />      
            </div>
            
        );
}

export default DocumentsEtudiant;

