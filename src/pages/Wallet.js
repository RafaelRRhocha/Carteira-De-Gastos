import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email, currencies } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <input data-testid="value-input" placeholder="despesa" type="text" />
          <input
            data-testid="description-input"
            placeholder="descrição"
            type="text"
          />
          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
            >
              {currencies.map((element, i) => (<option key={ i }>{element}</option>))}
            </select>
          </label>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(Wallet);
