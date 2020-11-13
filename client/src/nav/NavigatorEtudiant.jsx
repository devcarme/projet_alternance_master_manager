import React, { Component, useContext } from "react";
import "../css/App.css";
import "../css/index.css";
import 'react-pro-sidebar/dist/css/styles.css';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

class NavigatorEtudiant extends Component {
    constructor(props) {
        super(props);
        this.state = {
                       error: "",
                       isLoggedIn: true,
                       redirection:null

        };
        this.sessionDestroy = this.sessionDestroy.bind(this);
    }


    sessionDestroy(){
        fetch('http://localhost:9000/users/sessionDestroy')
            .then(res => res.json())
            .then(res => {
                if(res.ok){
                    this.setState({ isLoggedIn: false });
                }
            })
            .then(window.location.reload())
    }

    setRedirection(redirection){
        var redirect = {lien: redirection};
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(redirect)
    };
    
    fetch('http://localhost:9000/users/setRedirection', requestOptions)
        .then(res => console.log(res))
    };


    render() {
        return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand><Link className="text-decoration-none text-info" to="/Etudiant" onClick={this.setRedirection("/Etudiant")}>Master Manager</Link></Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link><Link className="text-decoration-none text-light" to="/Profil" onClick={this.setRedirection("/Profil")}>Profil</Link></Nav.Link>
              <Nav.Link><Link className="text-decoration-none text-light" to="/CandidaturesEtudiant" onClick={this.setRedirection("/CandidaturesEtudiant")}>Candidatures</Link></Nav.Link>
              <Nav.Link><Link className="text-decoration-none text-light" to="/EntretiensEtudiant" onClick={this.setRedirection("/EntretiensEtudiant")}>Entretiens</Link></Nav.Link>
              <Nav.Link>Documents</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
            </Form>
            <Nav.Link href="#pricing"><Button onClick = {this.sessionDestroy}>Déconnexion</Button></Nav.Link>
        </Navbar>
        );
    }
}


export default NavigatorEtudiant;