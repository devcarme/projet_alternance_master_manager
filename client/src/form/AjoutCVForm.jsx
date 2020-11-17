import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';

class AjoutEntrepriseForm extends Component {
  state = {
    nomEntreprise: "",
    adresseEntreprise: "",
    entreprises: [],
    cvs: [],
    lms: []
  };

  handleChangeNomEntreprise = event => {
    this.setState({ nomEntreprise: event.currentTarget.value });
  };

  handleChangeAdresseEntreprise = event => {
    this.setState({ adresseEntreprise: event.currentTarget.value });
  };


  handleSubmit = event => {
      event.preventDefault();
      this.props.onCreate({nomEntreprise: this.state.nomEntreprise, adresseEntreprise: this.state.adresseEntreprise});
  };

  getEntreprises(){
    fetch("http://localhost:9000/users/getEntreprises")
        .then((res) => res.json())
        .then(res => this.setState({ entreprises: res} ))
        .catch(err => err); 
  }


  componentDidMount(){
    //this.getEntreprises();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Fichier PDF</Form.Label>
          <Form.Control type="text" required  value={this.state.nomEntreprise} onChange={this.handleChangeNomEntreprise} autoComplete= "on" />
        </Form.Group>

        <Button type="submit">Ajouter</Button>
      </Form>
    );
  }
}

export default AjoutEntrepriseForm;