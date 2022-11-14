import {createReducer} from '@reduxjs/toolkit';
import {UserLoginInterface} from '../../../types/login';
import {
  CheckHolidays,
  CheckIsLogedIn,
  HideAlert,
  LoginAction,
  LogoutAction,
  SetTokenPushAction,
} from './LoginAction';

interface LoginSate {
  user: UserLoginInterface;
  isLogedin: boolean;
  loading: boolean;
  loadingCheckIsLogged: boolean;
  loadingHolidays: boolean;
  error: boolean;
  errorMessage: string;
}

const INITIAL_STATE: LoginSate = {
  user: {},
  isLogedin: false,
  loading: false,
  loadingCheckIsLogged: false,
  loadingHolidays: false,
  error: false,
  errorMessage: 'Ha ocurrido un error',
};

const loginReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(LoginAction.pending, state => {
      return {...state, loading: true};
    })
    .addCase(LoginAction.fulfilled, (state, action) => {
      return {...state, loading: false, ...action.payload};
    })
    .addCase(LoginAction.rejected, state => {
      return {...state, loading: false, error: true};
    })
    .addCase(SetTokenPushAction.pending, state => {
      return {...state};
    })
    .addCase(SetTokenPushAction.fulfilled, (state, action) => {
      return {...state, loading: false, ...action.payload};
    })
    .addCase(SetTokenPushAction.rejected, state => {
      return {...state, loading: false, error: true};
    })
    .addCase(CheckIsLogedIn.pending, state => {
      return {...state, loadingCheckIsLogged: true};
    })
    .addCase(CheckIsLogedIn.fulfilled, (state, action) => {
      return {...state, loadingCheckIsLogged: false, ...action.payload};
    })
    .addCase(CheckIsLogedIn.rejected, state => {
      return {...state, loadingCheckIsLogged: false, error: true};
    })
    .addCase(CheckHolidays.pending, state => {
      return {...state, loadingHolidays: true};
    })
    .addCase(CheckHolidays.fulfilled, (state, action) => {
      return {...state, loadingHolidays: false, ...action.payload};
    })
    .addCase(CheckHolidays.rejected, state => {
      return {...state, loadingHolidays: false, error: true};
    })
    .addCase(HideAlert, state => {
      return {
        ...state,
        error: false,
        errorMessage: 'Ha ocurrido un error',
      };
    })
    .addCase(LogoutAction.fulfilled, (state, action) => {
      return {...state, loading: false, ...action.payload};
    })
    .addCase(LogoutAction.rejected, () => {
      return INITIAL_STATE;
    });
});

export default loginReducer;
