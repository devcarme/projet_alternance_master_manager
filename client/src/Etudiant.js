import React, { Component } from "react";
import "./css/App.css";
import NavigatorEtudiant from './nav/NavigatorEtudiant';
import "./css/index.css";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import CandidaturesEtudiant from './CandidaturesEtudiant';

class Etudiant extends Component {
    constructor(props) {
        super(props);
        this.state = {  
                       session: "",

        };
    }
    
    getSession(){
        fetch("http://localhost:9000/users/getSession")
            .then((res) => res.text())
            .then(res => this.setState({ session: res} ))
            .catch(err => err); 
    }

    componentDidMount() {
        this.getSession();
    }
    
    render() {
             


        return (
            <div className="App">
                <NavigatorEtudiant/>
                TABLEAU DE BORD ETUDIANT
            </div>

        );
    }
}

export default Etudiant;

