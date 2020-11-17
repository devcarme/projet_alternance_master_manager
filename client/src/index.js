import React, { Component } from "react";
import ReactDOM from 'react-dom';
import logo from "./logo.svg";
import "./css/App.css";
import "./css/index.css";
import LoginForm from "./form/LoginForm";
import Etudiant from './Etudiant';
import Enseignant from './Enseignant';
import Admin from './Admin';
import CandidaturesEtudiant from './CandidaturesEtudiant';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import EntretiensEtudiant from './EntretiensEtudiant';
import DocumentsEtudiant from './DocumentsEtudiant';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
                       error: "",
                       redirection:null,
                       isLoggedIn: false
        };
    }
    
    verifyPassword = arrayUser =>{
        var login = arrayUser.login;
        var password = arrayUser.password;
        var user = {log: login, pwd: password};
        const requestOptions = {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(user)
        };
        
        fetch('http://localhost:9000/users', requestOptions)
            .then(res => res.json())
            .then(res => {
                if(res.ok){
                    this.setState({ redirection: "/"+res.statut });
                    this.setState({ isLoggedIn: true });
                } else{
                    this.setState({error: res.error})
                }
            })
    };

    isLoggedIn(){
        fetch('http://localhost:9000/users/isLoggedIn')
          .then(res => res.json())
          .then(res => this.setState({isLoggedIn: res.loggedIn}))
    }

    getRedirection(){
        fetch('http://localhost:9000/users/getRedirection')
          .then(res => res.json())
          .then(res => this.setState({redirection: res.redirect}))
    }

    componentDidMount() {
        this.isLoggedIn();
        this.getRedirection();
    }

    render() {
        if (this.state.isLoggedIn){
           return(
            <Router>
                <Redirect push to = {this.state.redirection} />
                <Switch>
                    <Route path="/Etudiant" component={Etudiant} />
                    <Route path="/Enseignant" component={Enseignant} />
                    <Route path="/Admin" component={Admin} />
                    <Route path="/CandidaturesEtudiant" component={CandidaturesEtudiant} />
                    <Route path="/EntretiensEtudiant" component={EntretiensEtudiant} />
                    <Route path="/DocumentsEtudiant" component={DocumentsEtudiant} />
                </Switch>
            </Router>
           );
        } else{
            return(
                <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            <h1 className="App-title">Master Alternance Login Manager</h1>
                        </header>
                        <p className="App-intro">{this.state.error}</p>
                        <LoginForm onLogin={this.verifyPassword} />
                    </div>
            );
        }
    }
}

ReactDOM.render(     
    <Index />,
    document.getElementById('root')        
  );

