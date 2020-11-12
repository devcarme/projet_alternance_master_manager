import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';
import EntrepriseSelect from "./EntrepriseSelect";
import CVSelect from "./CVSelect";

class AjoutCandidatureForm extends Component {
  state = {
    idEntreprise: null,
    origineOffre: "",
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
      var idEntreprise = this.state.idEntreprise;
      var origineOffre = this.state.origineOffre;
      var idCV = this.state.idCV;
      var idEntretien = this.state.idEntretien;
      var idLettreMotivation = this.state.idLettreMotivation;
      this.props.onCreate({idEntreprise, origineOffre, idCV, idEntretien, idLettreMotivation});
      
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
          <Form.Control as="select" onChange={this.handleChangeEntreprise}>
          {this.state.entreprises.map(entreprise => (
            <EntrepriseSelect
               key={entreprise.idEntreprise}
              details={entreprise}
            />
          ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>CV</Form.Label>
          <Form.Control as="select" onChange={this.handleChangeCV}>
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
          <Form.Control type="text" placeholder="Origine de l'offre" value={this.state.origineOffre} onChange={this.handleChangeOrigineOffre} autoComplete= "on" />
        </Form.Group>

        <Button>Créer</Button>
      </Form>
    );
  }
}

export default AjoutCandidatureForm;