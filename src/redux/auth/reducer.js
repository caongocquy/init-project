import { createAction, handleActions } from 'redux-actions';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import ReducerUtils from '../ReducerUtils';
import Types from '.';
import R from 'src/res/R';

// state init
const defaultState = {
  user: null,
  user_id: null,
  access_token: null,
  requesting: false,
  message: null,
  error: false,
  isAuthorized: false,
  isLogin: false,
  login: {
    requesting: false,
    message: null,
    error: false,
    type: null,
  },
};
// config save storage
const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['access_token', 'user'],
};

// type for action

// create action
export const actions = {
  login: createAction(Types.LOGIN),
  loginSuccess: createAction(Types.LOGIN_SUCCESS),
  loginFailed: createAction(Types.LOGIN_FAIL),
};

// handle actions
const authReducer = handleActions(
  {
    [Types.LOGIN]: (state, action) => {
      return {
        ...state,
        user_id: null,
        access_token: null,
        login: {
          ...state.login,
          requesting: true,
          message: null,
          error: false,
        },
      };
    },

    [Types.LOGIN_SUCCESS]: (state, action) => {
      return {
        ...state,
        user_id: action.data.user_id,
        access_token: action.data.access_token,
        login: {
          ...state.login,
          requesting: false,
          message: null,
          error: false,
        },
      };
    },

    [Types.LOGIN_FAIL]: (state, action) => {
      return {
        ...state,
        login: {
          ...state.login,
          requesting: false,
          message: action.message,
          error: true,
        },
      };
    },
  },
  defaultState,
);

export default persistReducer(persistConfig, authReducer);
// export default authReducer;
