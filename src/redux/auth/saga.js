import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest, all } from 'redux-saga/effects';
import Types from './index';
import API from 'src/utils/api';
import { showMessage } from 'react-native-flash-message';
import codePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';
import R from 'src/res/R';
import { actions } from './reducer';
function* unauthorized(action) {
  yield put({ type: Types.LOGOUT });
}

function* login(action) {
  try {
    let response = yield API.request(action.payload);
    console.log('login.response', response);

    if (response.error || response.errors) {
      yield put({ ...action, type: Types.LOGIN_FAIL, message: response.message });
    } else {
      const access_token = response.access_token;
      var jwtDecode = require('jwt-decode');
      var now = Date.now() / 1000;
      try {
        var decoded = jwtDecode(access_token);
        if (decoded.exp > now) {
          console.log('LOGIN_A', 'decoded.exp > now');
          // response to LOGIN actions
          yield put({
            ...action,
            type: Types.LOGIN_SUCCESS,
            data: { user_id: decoded.sub, access_token: access_token },
          });
          // Update last login user

          // Store access token and user_id
          console.log('LOGIN_A', 'setAccount');

          console.log('LOGIN_A', 'getDetailUser');
          const payload = {
            api: R.values.apiUsers,
            method: 'GET',
            token: access_token,
          };
          yield put(actions.getUserDetails(payload));
        } else {
          console.log('LOGIN_A', 'decoded.exp <= now');
          yield put({
            ...action,
            type: Types.LOGIN_FAIL,
            message: 'Phiên làm việc hết hạn, vui lòng đăng nhập lại!',
          });
        }
      } catch (error) {
        console.log('LOGIN_A', 'error', error);
        yield put({
          ...action,
          type: Types.LOGIN_FAIL,
          message: 'Invalid Token!',
        });
      }
    }
  } catch (error) {
    console.log('error', error);
    yield put({ ...action, type: Types.LOGIN_FAIL, ...error });
  }
}

export default function* saga() {
  yield all([takeLatest(Types.LOGIN, login)]);
}
