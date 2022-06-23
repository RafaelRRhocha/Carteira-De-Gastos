import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createActionEmail, createActionWallet } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disable: false,
    currencies: [],
  };

  shouldComponentUpdate() {
    this.filterCurrencies();
  }

  fetchAPI = async () => {
    const api = await fetch('https://economia.awesomeapi.com.br/json/all');
    const obj = Object.keys(await api.json()).filter((e) => e !== 'USDT');
    return obj;
  };

  verifyInputPassword = ({ target: { value } }) => this.setState({ password: value });

  verifyInputEmail = ({ target: { value } }) => {
    const { email } = this.state;
    const regexValidation = /\S+@\w+\.\w+/i;
    const finalValidation = regexValidation.test(email);
    this.setState({ email: value, disable: finalValidation });
  };

  filterCurrencies = async () => {
    const currenciesApi = await this.fetchAPI();
    this.setState({ currencies: currenciesApi });
  };

  sendState = () => {
    const { email, currencies } = this.state;
    const {
      dispatchLogin,
      requestApiDis,
      expenses,
      editor,
      idToEdit,
      history,
    } = this.props;
    const obj = {
      email,
      currencies,
      expenses,
      editor,
      idToEdit,
    };
    dispatchLogin(obj);
    requestApiDis(obj);
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
  requestApiDis: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (loginState) => dispatch(createActionEmail(loginState)),
  requestApiDis: (api) => dispatch(createActionWallet(api)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
