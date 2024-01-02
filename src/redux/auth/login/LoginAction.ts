import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import CustomAxios from '../../../network/CustomAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IsLoggedData, SessionData} from '../../../types/login';
import moment from 'moment';

interface Body {
  usuarios: string;
  password: string;
}
export interface SessionLType {
  datos: SessionData;
  mensaje: string;
}
export interface SessionDType {
  datos: IsLoggedData;
  mensaje: string;
}

export const LoginAction = createAsyncThunk('SET_LOGIN', async (body: Body) => {
  try {
    if (body.usuarios === '' || body.password === '') {
      return {
        error: true,
        errorMessage: 'loginScreen.errorMessage',
      };
    }
    const data = {...body};
    const url: string = 'login';
    const urlHolidays: string = 'information';

    const response = await CustomAxios.post(url, data);
    const {datos}: SessionLType = response.data;
    const responseHolidays: any = await CustomAxios.post(urlHolidays, {
      NoNomina: datos.NoNomina,
    });
    const holiday: SessionDType = responseHolidays.data;
    const ingreso = moment(holiday.datos.Ingreso, 'YYYY-MM-DD').format(
      'DD/MM/YYYY',
    );
    const user = {
      id: datos.NoNomina,
      username: body.usuarios,
      role: {name: 'Web Developer'},
      person: {
        name: datos.user_display_name,
        birthday: '',
        residence: 'Jalisco',
      },
      created: ingreso,
      employee: {
        totalholidays: holiday.datos.Saldo_Vacacional,
        usedholidays: 0,
      },
    };
    const token = (Math.random() + 2).toString(36).substring(2);
    const idFile = 1;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('userI', JSON.stringify(user));

    return {user: user, isLogedin: true, idFile: idFile};
  } catch (error: any) {
    console.log('ERROR LOGIN =>', error?.response.data ?? error);
    const respError = error?.response?.data?.error ?? '';
    let errorMessage: string = 'common.error';

    return {
      error: true,
      errorMessage: errorMessage,
    };
  }
});

export const CheckIsLogedIn = createAsyncThunk('CHECK_LOGIN', async () => {
  try {
    const userI = await AsyncStorage.getItem('userI');
    console.log(userI);
    if (!userI) {
      return {isLogedin: false};
    }

    return {
      user: {
        ...JSON.parse(userI),
      },
      isLogedin: true,
    };
  } catch (error: any) {
    console.log('ERROR CHECK =>', error?.response.data ?? error);
    await AsyncStorage.clear();
    return {isLogedin: false, error: false};
  }
});

export const HideAlert = createAction('HIDE_ALERT');

export const LogoutAction = createAsyncThunk('SET_LOGOUT', async () => {
  try {
    const url: string = 'sessions/logout';
    await CustomAxios.post(url, {});
    await AsyncStorage.clear();
    return {user: {}, isLogedin: false};
  } catch (error: any) {
    await AsyncStorage.clear();
    return {
      user: {},
      isLogedin: false,
    };
  }
});
