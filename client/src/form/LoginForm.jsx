import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    login: "",
    password: "",
    arrayUser: []
  };

  handleChangeLogin = event => {
    this.setState({ login: event.currentTarget.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.currentTarget.value });
  };

  handleSubmit = event => {
      event.preventDefault();
      var login = this.state.login;
      var password = this.state.password;
      this.props.onLogin({login, password });
      
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.login}
          onChange={this.handleChangeLogin}
          type="text"
          placeholder="Identifiant"
          autoComplete= "on"
        />
        <input
          value={this.state.password}
          onChange={this.handleChangePassword}
          type="password"
          placeholder="Mot de passe"
          autoComplete = "on"
        />
        <button>Se connecter</button>
      </form>
    );
  }
}

export default LoginForm;