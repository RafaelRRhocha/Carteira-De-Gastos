// Coloque aqui suas actions

import {
  USER_EMAIL,
  WALLET,
  REMOVE_WALLET,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
} from './actionTypes';

export const createActionEmail = (value) => ({
  type: USER_EMAIL,
  payload: value,
});

export const createActionWallet = (value) => ({
  type: WALLET,
  payload: value,
});

export const createRemoveWallet = (id) => ({
  type: REMOVE_WALLET,
  id,
});

export const createEditExpense = (id, newExpense) => ({
  type: EDIT_EXPENSE,
  payload: {
    id,
    newExpense,
  },
});

export const createUpdateExpense = (newExpense) => ({
  type: UPDATE_EXPENSE,
  payload: newExpense,
});
