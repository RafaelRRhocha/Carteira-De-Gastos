// Coloque aqui suas actions

import { USER_EMAIL, WALLET, REMOVE_WALLET } from './actionTypes';

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
