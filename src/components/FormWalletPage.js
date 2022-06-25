import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createActionWallet } from '../actions';
import '../css/Wallet.css';

class FormWalletPage extends React.Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentacão',
    exchangeRates: {},
  };

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  fetchApiExpenses = async () => {
    const { requestApiDis, currencies, expenses, editor, idToEdit } = this.props;
    const api = await fetch('https://economia.awesomeapi.com.br/json/all');
    const dataApiExpenses = await api.json();
    this.setState({
      id: !expenses.length ? 0 : expenses.length,
      exchangeRates: dataApiExpenses,
    });
    console.log(this.state);
    const obj = {
      currencies,
      expenses: [...expenses, this.state],
      editor,
      idToEdit,
    };
    requestApiDis(obj);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="form">
        <input
          data-testid="value-input"
          placeholder="valor a ser gasto"
          type="number"
          value={ value }
          name="value"
          onChange={ this.handleChange }
          className="clean"
        />
        <label htmlFor="moeda">
          Moeda:
          <select
            id="moeda"
            value={ currency }
            name="currency"
            onChange={ this.handleChange }
          >
            {currencies.map((element, i) => (
              <option key={ i }>{element}</option>
            ))}
          </select>
        </label>
        <label htmlFor="methodo">
          Método de Pagamento:
          <select
            id="methodo"
            data-testid="method-input"
            value={ method }
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tags">
          Tag:
          <select
            id="tags"
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <input
          data-testid="description-input"
          placeholder="digite a descrição"
          type="text"
          value={ description }
          name="description"
          onChange={ this.handleChange }
          className="clean"
        />
        <button type="button" onClick={ this.fetchApiExpenses }>
          Adicionar Despesas
        </button>
      </form>
    );
  }
}

FormWalletPage.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  requestApiDis: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  requestApiDis: (api) => dispatch(createActionWallet(api)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormWalletPage);
