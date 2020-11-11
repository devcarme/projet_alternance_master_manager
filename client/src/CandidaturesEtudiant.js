import React, { Component } from "react";
import "./css/App.css";
import NavigatorEtudiant from "./NavigatorEtudiant";
import CandidatureDetails from "./CandidatureDetails";
import "./css/index.css";
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class CandidaturesEtudiant extends Component {
    constructor(props) {
        super(props);
        this.state = { 
                       etudiants: [],
                       enseignants:[],
                       candidatures:[]
        };
    }

    
    getEtudiants(){
       fetch("http://localhost:9000/users/getEtudiants")
            .then((res) => res.json())
            .then(res => this.setState({ etudiants: res} ))
            .catch(err => err); 
    }

    getEnseignants(){
        fetch("http://localhost:9000/users/getEnseignants")
            .then((res) => res.json())
            .then(res => this.setState({ enseignants: res} ))
            .catch(err => err);
    }

    getCandidatures(){
        fetch("http://localhost:9000/users/getCandidatures")
            .then((res) => res.json())
            .then(res => this.setState({ candidatures: res} ))
            .catch(err => err);
    }

    componentDidMount() {
        this.getEtudiants();
        this.getEnseignants();
        this.getCandidatures();
    }

    render() {
        return (
            
            <div>
                <NavigatorEtudiant/>
                <br/>
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
                            {this.state.candidatures.map(candidature => (
                                <CandidatureDetails
                                key={candidature.idCandidature}
                                details={candidature}
                                />
                            ))}
                        </tbody>
                    </Table>
                        
            </div>
            
        );
    }
}

export default CandidaturesEtudiant;

