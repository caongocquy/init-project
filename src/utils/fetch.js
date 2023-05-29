import {isImmutable} from 'immutable';

import demoConfig from './demo';
import globalConfig from './global';
import configApi from 'src/config/api';
import {ENABLE_CONFIG_DEMO} from 'src/config/development';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
/**
 * General API url and check point
 * @param url
 * @since 1.0.0
 * @package rn_lekima
 * @return {{baseURL: string, isAuth: boolean, isWC: boolean, isQuery: boolean}}
 */
function generalUrl(url) {
  const apiUrl = configApi.API_ENDPOINT;

  let baseURL = apiUrl + url;

  const isAuth = url.indexOf('/login') === 0;

  return {
    baseURL,
    isAuth,
  };
}

/**
 * Get method
 * @param url
 * @param options
 * @return {Promise<R>}
 */
const get = async (url, headers = {}, usingContentType = true) => {
  const {isAuth, baseURL} = generalUrl(url);
  const access_token = await AsyncStorage.getItem('access_token');
  let request = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Secret-Code': configApi.SECRET_CODE,
      ...headers,
    },
  };

  if (access_token) {
    request.headers.Authorization = 'Bearer ' + access_token;
  }

  console.log('==API Request==', baseURL, request);

  let response = await fetch(baseURL, request);
  console.log('==API Response==', response);
  /* Check response */
  // try {
  // Parse json
  const json = await response.json();
  console.log('==API Response Json==', json);
  if (response.status > 299) {
    let _message = '';
    if (!json.error && !json.errors) {
      if (response.status > 499) {
        _message =
          'Đã xảy ra lỗi từ hệ thống.\nVui lòng liên hệ với chúng tôi qua tổng đài ... để được trợ giúp!';
      } else {
        _message = 'Thông tin chưa chính xác. Vui lòng kiểm tra lại!';
      }
    } else if (json.errors) {
      _message += json.message + '\n';
      // Array errors
      if (Array.isArray(json.errors)) {
        for (let i = 0; i < json.errors.length; i++) {
          for (var key in json.errors[i]) {
            _message += json.errors[i][key] + '\n';
          }
        }
        // Object errors
      } else {
        for (var key in json.errors) {
          for (let i = 0; i < json.errors[key].length; i++) {
            _message += json.errors[key][i] + '\n';
          }
        }
      }

      // for(var key in json.errors) _message += json.errors[key] + '\n';
    } else {
      _message += json.error;
    }
    console.log('==API Errors==', _message);
    // throw exception
    console.log('error', 'status', response);
    throw {
      error_code: response.status,
      message: _message,
      error: true,
    };
  } else {
    return json;
  }
};

const post = async (
  url,
  body,
  method = 'POST',
  headers = {},
  usingContentType = true,
) => {
  const {isAuth, baseURL} = generalUrl(url);
  const access_token = await AsyncStorage.getItem('access_token');
  let request = {
    method: method,
    headers: usingContentType
      ? {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Secret-Code': configApi.SECRET_CODE,
          ...headers,
        }
      : {
          Accept: 'application/json',
          'Secret-Code': configApi.SECRET_CODE,
          ...headers,
        },
  };

  if (access_token) {
    request.headers.Authorization = 'Bearer ' + access_token;
  }
  if ((method === 'POST' || method === 'DELETE' || method === 'PUT') && body) {
    if (usingContentType) {
      request.body = JSON.stringify(body);
    } else {
      request.body = body;
    }
  }

  console.log('==API Request==', baseURL, request);

  let response = await fetch(baseURL, request);
  console.log('==API Response==', response);
  /* Check response */
  // try {
  // Parse json
  const json = await response.json();
  console.log('==API Response Json==', json);
  if (response.status > 299) {
    let _message = '';
    if (!json.error && !json.errors) {
      if (response.status > 499) {
        _message =
          'Đã xảy ra lỗi từ hệ thống.\nVui lòng liên hệ với chúng tôi qua tổng đài ... để được trợ giúp!';
      } else {
        _message = 'Thông tin chưa chính xác. Vui lòng kiểm tra lại!';
      }
    } else if (json.errors) {
      _message += json.message + '\n';
      // Array errors
      if (Array.isArray(json.errors)) {
        for (let i = 0; i < json.errors.length; i++) {
          for (var key in json.errors[i]) {
            _message += json.errors[i][key] + '\n';
          }
        }
        // Object errors
      } else {
        for (var key in json.errors) {
          for (let i = 0; i < json.errors[key].length; i++) {
            _message += json.errors[key][i] + '\n';
          }
        }
      }

      // for(var key in json.errors) _message += json.errors[key] + '\n';
    } else {
      _message += json.error;
    }
    console.log('==API Errors==', _message);
    // throw exception
    console.log('error', 'status', response);
    throw {
      error_code: response.status,
      message: _message,
      error: true,
    };
  } else {
    return json;
  }
};

export default {
  get,
  post,
  put: (url, data) => post(url, data, 'PUT'),
};
