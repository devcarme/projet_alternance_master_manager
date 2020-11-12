import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';

class AjoutEntretienForm extends Component {
  state = {
    dateEntretien: "",
    intervenant: "",
    entretiens: [],
    entretiens: []
  };

  handleChangeDateEntretien = event => {
    this.setState({ dateEntretien: event.currentTarget.value });
  };

  handleChangeIntervenant = event => {
    this.setState({ intervenant: event.currentTarget.value });
  };


  handleSubmit = event => {
      event.preventDefault();
      var dateEntretien = this.state.dateEntretien;
      var intervenant = this.state.intervenant;
      this.props.onCreate({dateEntretien, intervenant});
      
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


  componentDidMount(){
    this.getEntretiens();
    this.getIntervenants();
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

        <Button type="submit">Ajouter</Button>
      </Form>
    );
  }
}

export default AjoutEntretienForm;