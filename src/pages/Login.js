import PropTypes from 'prop-types';
import React from 'react';
import logo from '../imagem/logoRoxo.png';
import '../index.css';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    isDisable: true,
    user: '',
  };

  handleChangeUser = ({ target }) => {
    const { value } = target;
    this.setState({
      user: value,
    }, () => {
      const { user } = this.state;
      const minLength = 3;
      const validation = user.length < minLength;
      this.setState({ isDisable: validation });
    });
  };

  handleClick = () => {
    const { user } = this.state;
    const { history } = this.props;
    createUser({ name: user });
    history.push('/search');
  };

  render() {
    const { isDisable, user } = this.state;
    return (
      <div data-testid="page-login" className="loginPage">
        <img src={ logo } alt="logo" className="loginLogo" />
        <form className="loginForm">
          <label htmlFor="login">
            <input
              data-testid="login-name-input"
              value={ user }
              type="text"
              onChange={ this.handleChangeUser }
              placeholder="Insira seu nome"
              className="loginInput"
            />
          </label>
          <button
            data-testid="login-submit-button"
            disabled={ isDisable }
            type="button"
            onClick={ this.handleClick }
            className="btnInput"
          >
            Entrar
          </button>
        </form>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
