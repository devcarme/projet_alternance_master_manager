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
      var nomEntreprise = this.state.nomEntreprise;
      var adresseEntreprise = this.state.adresseEntreprise;
      this.props.onCreate({nomEntreprise, adresseEntreprise});
      
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
          <Form.Label>Nom de l'entreprise</Form.Label>
          <Form.Control type="text" required placeholder="Nom de l'entreprise" value={this.state.nomEntreprise} onChange={this.handleChangeNomEntreprise} autoComplete= "on" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Adresse de l'entreprise</Form.Label>
          <Form.Control type="text" required placeholder="Adresse de l'entreprise" value={this.state.adresseEntreprise} onChange={this.handleChangeAdresseEntreprise} autoComplete= "on" />
        </Form.Group>

        <Button type="submit">Ajouter</Button>
      </Form>
    );
  }
}

export default AjoutEntrepriseForm;