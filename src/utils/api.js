import { Platform } from 'react-native';
import R from '@res/R';
import NetInfo from "@react-native-community/netinfo";
import checkDev from './checkDev';
import getIp from './checkIp';
export default class API {
  static isConnected = true;
  
  static async request(action, headers = {}, usingContentType = true, useDomain = true) {
    // let a = await NetInfo.isConnected.fetch();
    // let isConnected = await NetInfo.isConnected.fetch();
    let apiURL = ''
    let env = await checkDev();
    let ip = await getIp();
    let serverUrl ='https://develop-admin.norifood.vn';
    let SECRET_CODE = '7bc79fa5139b8266e12993014bb68955';
    if(ip){
       serverUrl = ip;
       SECRET_CODE = '7bc79fa5139b8266e12993014bb68955';
    }
    else{
      if (env == 'PRODUCTION') {
        serverUrl = 'https://admin.norifood.vn';
        SECRET_CODE = '7bc79fa5139b8266e12993014bb68955';
      }
      else if(env == 'STAGING'){
        serverUrl = 'https://staging-api-food.norifood.vn';
        SECRET_CODE = 's4P5GDf1lVIiaAAY1mR4Wo9nuuwMxwOY';
      }
    }
    const api = `${serverUrl}/api`;
    apiURL = useDomain? `${api}${action.api}`: action.api
    if (API.isConnected) {
      let method = action.method || 'GET';
      let request = {
        method: method,
        headers: usingContentType
          ? {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Secret-Code': SECRET_CODE,
            ...headers,
          }
          : {
            Accept: 'application/json',
            'Secret-Code': SECRET_CODE,
            ...headers,
          },
      };

      if (action.token) {
        request.headers.Authorization = 'Bearer ' + action.token;
      }

      if (
        (method === 'POST' || method === 'DELETE' || method === 'PUT') &&
        action.body
      ) {
        if (usingContentType) {
          request.body = JSON.stringify(action.body);
        } else {
          request.body = action.body;
        }
      }

      console.log('==API Request==', apiURL, request);

      /* Request */
      let response = await fetch(apiURL, request);

      console.log('==API Response==', apiURL, response);
      /* Check response */
      // try {
      // Parse json
      const json = await response.json();
      console.log('==API Response Json==', apiURL, json);

      // Check json
      if (response.status > 299) {
        let _message = '';
        if (json.message) {
          _message = json.message;
        } else if (!json.error && !json.errors) {
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
            for (i = 0; i < json.errors.length; i++) {
              for (var key in json.errors[i]) {
                _message += json.errors[i][key] + '\n';
              }
            }
            // Object errors
          } else {
            for (var key in json.errors) {
              for (i = 0; i < json.errors[key].length; i++) {
                _message += json.errors[key][i] + '\n';
              }
            }
          }

          // for(var key in json.errors) _message += json.errors[key] + '\n';
        } else {
          _message += json.error;
        }
        console.log('==API Errors==', apiURL, _message);
        // throw exception
        console.log('error', 'status', response);
        throw {
          error_code: response.status,
          message: _message,
        };
      }

      return json;
      // } catch (error){
      //   if (response.status > 299) {
      //     let _message = '';
      //     if (response.status > 499){
      //       _message = 'Đã xảy ra lỗi từ hệ thống.\nVui lòng liên hệ với chúng tôi qua tổng đài 1900 6734 để được trợ giúp!';
      //     } else {
      //       _message = 'Thông tin chưa chính xác. Vui lòng kiểm tra lại!';
      //     }

      //     console.log('==API Error==', apiURL, _message);

      //     throw {
      //       error_code: response.status,
      //       message: '',
      //     };
      //   }
      // }

      // No Connection
    } else {
      throw {
        error_code: 503,
        message:
          'Không thể kết nối tới máy chủ.\nVui lòng kiểm tra kết nối internet và thử lại!',
      };
    }
  }
}
