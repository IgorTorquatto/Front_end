import { all, call, put, takeLatest } from 'redux-saga/effects';

import { loadSessionSucess, loadSessionFailure, loadSession, editProfile } from './actions';
import { TokenData, TokenState, TokenStateFromback, TokensTypes, User } from './types';
import { api, apiUnAuth } from '../../../services/api';

interface loadProps {
  payload: {
    variable: string
  }
}

function* edit({ payload }: ReturnType<typeof editProfile>) {
  try {
    const { data } = payload;

    // Obtenha o token atual do localStorage
    const currentToken = localStorage.getItem("@token");
    if(currentToken){
      var user: TokenData = {
        data: data,
        token:currentToken,
        logged: true
      }
    yield put(loadSessionSucess(user));
  }
    


  } catch (err) {
    console.error(err);
    // Lidar com erros, se necessário
  }
}

export function* load({ payload }: ReturnType<typeof loadSession>) {
  try {
    const { data } = payload

    var user: TokenData = {
      ...data,
      logged: true
    }
    localStorage.setItem(
      "@token",
      data.token
    );
    yield put(loadSessionSucess(user));
    window.location.reload()
    if(data.data.crm){
      window.location.pathname = '/diagnostico'
    }else if(data.data.cnpj){
      window.location.pathname = '/clinica'
    }else{
      window.location.pathname = '/administracao'
    }
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
  takeLatest(TokensTypes.EDIT_PROFILE, edit),
  takeLatest(TokensTypes.LOAD_SESSION, load),
  takeLatest(TokensTypes.LOAD_LOGOUT, logout)
]);