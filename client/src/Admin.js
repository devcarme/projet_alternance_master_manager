import React, { Component } from "react";
import "./css/App.css";
import EnseignantDetails from "./details/EnseignantDetails";
import EtudiantDetails from "./details/EtudiantDetails";
import NavigatorAdmin from "./nav/NavigatorAdmin";
import "./css/index.css";
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
                       etudiants: [],
                       enseignants:[]
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

    componentDidMount() {
        this.getEtudiants();
        this.getEnseignants();
    }

    render() {
        return (
            
            <div>
                <NavigatorAdmin/>
                <br/>
                <Table striped bordered hover variant="dark">
                        <thead><th><h3>Liste des enseignants</h3></th></thead>
                        <thead>
                            <tr>
                            <th>Mail</th>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.enseignants.map(enseignant => (
                                <EnseignantDetails
                                key={enseignant.idUtilisateur}
                                details={enseignant}
                                />
                            ))}
                        </tbody>
                    </Table>

                    <Table striped bordered hover variant="dark">
                        <thead><th><h3>Liste des étudiants</h3></th></thead>
                        <thead>
                            <tr>
                            <th>Mail</th>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Parcours</th>
                            <th>Français</th>
                            <th>Date de naissance</th>
                            <th>Type de contrat</th>
                            <th>Date obtention stage</th>
                            <th>Entrprise</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.etudiants.map(etudiant => (
                                <EtudiantDetails
                                key={etudiant.idUtilisateur}
                                details={etudiant}
                                />
                            ))}
                        </tbody>
                    </Table>
                        
            </div>
            
        );
    }
}

export default Admin;

