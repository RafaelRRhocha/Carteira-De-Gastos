import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { XCircle } from 'phosphor-react';
import { createRemoveWallet } from '../actions';
import '../css/Wallet.css';

class TableWallet extends React.Component {
  render() {
    const { expenses, clearState } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th value="Descrição">Descrição</th>
            <th value="Tag">Tag</th>
            <th value="Método de pagamento">Método de pagamento</th>
            <th value="Valor">Valor</th>
            <th value="Moeda">Moeda</th>
            <th value="Câmbio utilizado">Câmbio utilizado</th>
            <th value="Valor convertido">Valor convertido</th>
            <th value="Moeda de conversão">Moeda de conversão</th>
            <th value="Editar/Excluir">Editar/Excluir</th>
          </tr>
          {expenses.map(
            ({
              description,
              tag,
              method,
              value,
              exchangeRates,
              currency,
              id,
            }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name.split('/')[0]}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {Number(exchangeRates[currency].ask * value).toFixed(2)}
                </td>
                <td>Real</td>
                <td className="button-container">
                  {/* <Pen size={ 20 } /> */}
                  <XCircle
                    size={ 20 }
                    data-testid="delete-btn"
                    onClick={ () => clearState(id) }
                  />
                </td>
              </tr>
            ),
          )}
        </thead>
      </table>
    );
  }
}

TableWallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  clearState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  clearState: (api) => dispatch(createRemoveWallet(api)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableWallet);
