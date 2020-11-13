import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';
import IntervenantSelect from '../select/IntervenantSelect';
import CandidatureSelect from '../select/CandidatureSelect';

class AjoutEntretienForm extends Component {
  state = {
    dateEntretien: "",
    intervenant: null,
    candidature: null,
    entretiens: [],
    entretiens: [],
    intervenants: [],
    candidatures: []
  };

  handleChangeDateEntretien = event => {
    this.setState({ dateEntretien: event.currentTarget.value });
  };

  handleChangeIntervenant = event => {
    this.setState({ intervenant: event.currentTarget.value });
  };

  handleChangeCandidature = event => {
    this.setState({ candidature: event.currentTarget.value });
  };


  handleSubmit = event => {
      event.preventDefault();
      var dateEntretien = this.state.dateEntretien;
      var intervenant = this.state.intervenant;
      var candidature = this.state.intervenant;
      this.props.onCreate({dateEntretien, intervenant, candidature});
      
  };

  getEntretiens(){
    fetch("http://localhost:9000/users/getEntretiens")
        .then((res) => res.json())
        .then(res => this.setState({ entretiens: res} ))
        .catch(err => err); 
  }

  getIntervenants(){
    fetch("http://localhost:9000/users/getIntervenants")
        .then((res) => res.json())
        .then(res => this.setState({ intervenants: res} ))
        .catch(err => err); 
  }

  getCandidatures(){
    fetch("http://localhost:9000/users/getCandidatures")
        .then((res) => res.json())
        .then(res => this.setState({ candidatures: res} ))
        .catch(err => err); 
  }


  componentDidMount(){
    this.getEntretiens();
    this.getIntervenants();
    this.getCandidatures();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Date de l'entretien</Form.Label>
          <Form.Control type="date" required placeholder="Date de l'entretien" value={this.state.dateEntretien} onChange={this.handleChangeDateEntretien} autoComplete= "on" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Intervenant</Form.Label>
          <Form.Control as="select" required onChange={this.handleChangeIntervenant}>
          <option selected value="" hidden></option>
          {this.state.intervenants.map(intervenant => (
            <IntervenantSelect
              key={intervenant.idIntervenant}
              details={intervenant}
            />
          ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Candidature</Form.Label>
          <Form.Control as="select" required onChange={this.handleChangeCandidature}>
          <option selected value="" hidden></option>
          {this.state.candidatures.map(candidature => (
            <CandidatureSelect
              key={candidature.idCandidature}
              details={candidature}
            />
          ))}
          </Form.Control>
        </Form.Group>

        <Button type="submit">Ajouter</Button>
      </Form>
    );
  }
}

export default AjoutEntretienForm;