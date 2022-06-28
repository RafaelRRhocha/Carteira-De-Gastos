// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

// Esse reducer será responsável por tratar as informações da pessoa usuária

import {
  WALLET,
  REMOVE_WALLET,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  newExpense: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET:
    return {
      ...state,
      currencies: action.payload.currencies,
      expenses: action.payload.expenses,
      editor: action.payload.editor,
      idToEdit: action.payload.idToEdit,
    };

  case REMOVE_WALLET:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload.id,
      newExpense: action.payload.newExpense,
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      }),
      editor: false,
      idToEdit: 0,
      newExpense: {},
    };
  default:
    return state;
  }
};

export default wallet;
