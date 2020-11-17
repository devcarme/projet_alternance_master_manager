import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';
import EntrepriseSelect from "../select/EntrepriseSelect";
import CVSelect from "../select/CVSelect";

class AjoutCandidatureForm extends Component {
  state = {
    idEntreprise: null,
    origineOffre: "",
    intituleOffre: "",
    idCV: null,
    idEntretien: null,
    idLettreMotivation: null,
    entreprises: [],
    cvs: [],
    lms: []
  };

  handleChangeEntreprise = event => {
    this.setState({ idEntreprise: event.currentTarget.value });
  };

  handleChangeOrigineOffre = event => {
    this.setState({ origineOffre: event.currentTarget.value });
  };

  handleChangeIntituleOffre = event => {
    this.setState({ intituleOffre: event.currentTarget.value });
  };

  handleChangeCV = event => {
    this.setState({ idCV: event.currentTarget.value });
  };

  handleChangeEntretien = event => {
    this.setState({ idEntretien: event.currentTarget.value });
  };

  handleChangeLettreMotivation = event => {
    this.setState({ idLettreMotivation: event.currentTarget.value });
  };

  handleSubmit = event => {
      event.preventDefault();
      this.props.onCreate({idEntreprise: this.state.idEntreprise, intituleOffre: this.state.intituleOffre, origineOffre: this.state.origineOffre, idCV: this.state.idCV, idEntretien: this.state.idEntretien, idLettreMotivation: this.state.idLettreMotivation});
  };

  getEntreprises(){
    fetch("http://localhost:9000/users/getEntreprises")
        .then((res) => res.json())
        .then(res => this.setState({ entreprises: res} ))
        .catch(err => err); 
  }

  getCVS(){
    fetch("http://localhost:9000/users/getCVS")
        .then((res) => res.json())
        .then(res => this.setState({ cvs: res} ))
        .catch(err => err); 
  }

  getLMS(){
    fetch("http://localhost:9000/users/getLMS")
        .then((res) => res.json())
        .then(res => this.setState({ lms: res} ))
        .catch(err => err); 
  }

  componentDidMount(){
    this.getEntreprises();
    this.getCVS();
    this.getLMS();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Entreprise</Form.Label>
          <Form.Control as="select" required onChange={this.handleChangeEntreprise}>
          <option selected value="" hidden></option>
          {this.state.entreprises.map(entreprise => (
            <EntrepriseSelect
               key={entreprise.idEntreprise}
              details={entreprise}
            />
          ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Intitulé de l'offre</Form.Label>
          <Form.Control type="text" required value={this.state.intituleOffre} onChange={this.handleChangeIntituleOffre} autoComplete= "on" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>CV</Form.Label>
          <Form.Control as="select" required onChange={this.handleChangeCV}>
          <option selected value="" hidden></option>
          {this.state.cvs.map(cv => (
            <CVSelect
               key={cv.idCV}
               details={cv}
            />
          ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Lettre de motivation (optionnel)</Form.Label>
          <Form.Control as="select" onChange={this.handleChangeLettreMotivation}>
          <option selected value="" hidden></option>
          {this.state.lms.map(lm => (
            <LMSelect
               key={lm.idLettreMotivation}
               details={lm}
            />
          ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Origine de l'offre</Form.Label>
          <Form.Control type="text" required value={this.state.origineOffre} onChange={this.handleChangeOrigineOffre} autoComplete= "on" />
        </Form.Group>

        <Button type="submit">Créer</Button>
      </Form>
    );
  }
}

export default AjoutCandidatureForm;