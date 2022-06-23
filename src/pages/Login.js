import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createActionEmail } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disable: false,
  };

  verifyInputPassword = ({ target: { value } }) => this.setState({ password: value });

  verifyInputEmail = ({ target: { value } }) => {
    const { email } = this.state;
    const regexValidation = /\S+@\w+\.\w+/i;
    const finalValidation = regexValidation.test(email);
    this.setState({ email: value, disable: finalValidation });
  };

  sendState = () => {
    const { email } = this.state;
    const { dispatchLogin, history } = this.props;
    const obj = {
      email,
    };
    dispatchLogin(obj);
    history.push('/carteira');
  };

  render() {
    const { email, password, disable } = this.state;
    const n5 = 5;
    return (
      <form>
        <input
          type="email"
          placeholder="Digite o Seu Email"
          data-testid="email-input"
          onChange={ this.verifyInputEmail }
          value={ email }
        />
        <input
          type="password"
          minLength={ 6 }
          placeholder="Digite a Sua Senha"
          data-testid="password-input"
          onChange={ this.verifyInputPassword }
          value={ password }
        />
        <button
          type="submit"
          onClick={ this.sendState }
          disabled={ !disable || password.length <= n5 }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (loginState) => dispatch(createActionEmail(loginState)),
});

export default connect(null, mapDispatchToProps)(Login);
