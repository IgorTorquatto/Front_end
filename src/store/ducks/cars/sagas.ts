import { all, call, put, takeLatest } from 'redux-saga/effects';

import { loadSuccess, loadFailure, loadRequest } from './actions';
import { Car, CarsState, CarsStateFromback, CarsTypes } from './types';
import { api } from '../../../services/api';

interface loadProps {
  payload: {
    variable: string
  }
}

export function* load({ payload }: ReturnType<typeof loadRequest>) {
  try {
    const { data } = payload
    let response: CarsStateFromback = yield call(api.get, `/cars/available?user_id=${data}`);

    var cars: Car[] = response.data

    yield put(loadSuccess(cars));
  } catch (err) {
    yield put(loadFailure());
  }
}

export default all([takeLatest(CarsTypes.LOAD_REQUEST, load)]);