import React, { Component } from "react";
import "./css/App.css";
import "./css/index.css";
import NavigatorEnseignant from "./nav/NavigatorEnseignant";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {session: ""
        };
    }

    getSession(){
        fetch("http://localhost:9000/users/getSession")
            .then((res) => res.text())
            .then(res => this.setState({ session: res} ))
            .catch(err => err); 
    }

    render() {
        return (
            <div className="App">
                <NavigatorEnseignant/>
                <p>Bienvenue enseignant !</p>
            </div>
        );
    }
}

export default App;

