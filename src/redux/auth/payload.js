import Types from '.';
import R from 'src/res/R';
import DeviceInfo from 'react-native-device-info';

export function checkToken(access_token) {
  return {
    type: Types.CHECK_TOKEN,
    access_token: access_token,
  };
}

export function login(phone, code) {
  console.log('sagaLogin', phone, code, R.values.apiLogin);
  return {
    type: Types.LOGIN,
    payload: {
      api: R.values.apiLogin,
      method: 'POST',
      body: {
        phone,
        code,
      },
    },
  };
}


}
