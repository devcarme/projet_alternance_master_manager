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
    
    setRedirection(redirection){
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

    componentDidMount() {
        this.getSession()
        this.setRedirection("/Etudiant")
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

