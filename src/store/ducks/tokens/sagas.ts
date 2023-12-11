import { all, call, put, takeLatest } from 'redux-saga/effects';

import { loadSessionSucess, loadSessionFailure, loadSession } from './actions';
import { TokenData, TokenState, TokenStateFromback, TokensTypes, User } from './types';
import { api, apiUnAuth } from '../../../services/api';

interface loadProps {
  payload: {
    variable: string
  }
}

export function* load({ payload }: ReturnType<typeof loadSession>) {
  try {
    const { data } = payload
    // var response = data as any
    let response: TokenStateFromback = yield call(apiUnAuth.post, `/medico/login`, data)
    var user: TokenData = {
      ...response.data,
      logged: true
    }
    localStorage.setItem(
      "@token",
      response.data.token
    );
    yield put(loadSessionSucess(user));
    window.location.reload()
    window.location.pathname = '/diagnostico'
  } catch (err) {
    console.log(err)
    localStorage.removeItem(
      "@token",
    );
    yield put(loadSessionFailure());
  }
}
export function* logout() {
  localStorage.removeItem("@token");
}

export default all([
  takeLatest(TokensTypes.LOAD_SESSION, load),
  takeLatest(TokensTypes.LOAD_LOGOUT, logout)
]);