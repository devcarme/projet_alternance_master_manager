import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';
import EntrepriseSelect from "../select/EntrepriseSelect";

class AjoutIntervenantForm extends Component {
  state = {
    mail: "",
    prenom: "",
    nom: "",
    fonction: "",
    entreprise: null,
    entreprises: [],
  };

  handleChangeMailIntervenant = event => {
    this.setState({ mail: event.currentTarget.value });
  };

  handleChangePrenomIntervenant = event => {
    this.setState({ prenom: event.currentTarget.value });
  };

  handleChangeNomIntervenant = event => {
    this.setState({ nom: event.currentTarget.value });
  };
  handleChangeFonctionIntervenant = event => {
    this.setState({ fonction: event.currentTarget.value });
  };

  handleChangeEntreprise = event => {
    this.setState({ entreprise: event.currentTarget.value });
  };



  handleSubmit = event => {
      event.preventDefault();
      this.props.onCreate({mailIntervenant: this.state.mail, nomIntervenant: this.state.nom, prenomIntervenant: this.state.prenom, fonctionIntervenant: this.state.fonction, entrepriseIntervenant: this.state.entreprise});
      
  };


  getEntreprises(){
    fetch("http://localhost:9000/users/getEntreprises")
        .then((res) => res.json())
        .then(res => this.setState({ entreprises: res} ))
        .catch(err => err); 
  }


  componentDidMount(){
    this.getEntreprises();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Mail</Form.Label>
          <Form.Control type="mail" required  value={this.state.mail} onChange={this.handleChangeMailIntervenant} autoComplete= "on" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Prénom</Form.Label>
          <Form.Control type="text" required  value={this.state.prenom} onChange={this.handleChangePrenomIntervenant} autoComplete= "on" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" required value={this.state.nom} onChange={this.handleChangeNomIntervenant} autoComplete= "on" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Entreprise</Form.Label>
          <Form.Control as="select" required onChange={this.handleChangeEntreprise}>
          <option defaultValue="" hidden></option>
          {this.state.entreprises.map(entreprise => (
            <EntrepriseSelect
              key={entreprise.idEntreprise}
              details={entreprise}
            />
          ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Fonction dans l'entreprise</Form.Label>
          <Form.Control type="text" required value={this.state.fonction} onChange={this.handleChangeFonctionIntervenant} autoComplete= "on" />
        </Form.Group>

        <Button type="submit">Ajouter</Button>
      </Form>
    );
  }
}

export default AjoutIntervenantForm;