import React, { Component, useContext } from "react";
import "./css/App.css";
import "./css/index.css";
import 'react-pro-sidebar/dist/css/styles.css';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class NavigatorAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
                       error: "",
                       isLoggedIn: true

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



    render() {
        return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Master Manager</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Page d'administration</Nav.Link>
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


export default NavigatorAdmin;