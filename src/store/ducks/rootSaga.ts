import { all } from 'redux-saga/effects';

import tokens from './tokens/sagas';

export default function* rootSaga() {
   yield all([tokens]);
}
