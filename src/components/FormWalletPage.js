import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FormWalletPage extends React.Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <input data-testid="value-input" placeholder="valor a ser gasto" type="text" />
        <input
          data-testid="description-input"
          placeholder="digite a descrição da compra"
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
    );
  }
}

FormWalletPage.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(FormWalletPage);
