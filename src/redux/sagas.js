import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
// config rootSaga
export default function* rootSagas() {
  yield all([authSaga()]);
}
