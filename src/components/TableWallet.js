import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableWallet extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
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
            (
              { description, tag, method, value, exchangeRates, currency },
              i,
            ) => (
              <tr key={ i }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name.split('/')[0]}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{Number(exchangeRates[currency].ask * value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button" data-testid="delete-btn">Excluir</button>
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
  expenses: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(TableWallet);
