import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createActionWallet } from '../actions';
import FormWalletPage from '../components/FormWalletPage';
import TableWallet from '../components/TableWallet';

class Wallet extends React.Component {
  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI = async () => {
    const { requestApiDis, expenses, editor, idToEdit } = this.props;
    const api = await fetch('https://economia.awesomeapi.com.br/json/all');
    const dataApi = Object.keys(await api.json()).filter((e) => e !== 'USDT');
    const obj = {
      currencies: dataApi,
      expenses,
      editor,
      idToEdit,
    };
    requestApiDis(obj);
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">
            {!expenses
              ? 0
              : expenses.reduce((acc, curr) => {
                acc += curr.exchangeRates[curr.currency].ask * curr.value;
                return acc;
              }, 0)
                .toFixed([2])}

          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <div>
          <FormWalletPage />
        </div>
        <div>
          <TableWallet />
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  requestApiDis: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  requestApiDis: (api) => dispatch(createActionWallet(api)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
