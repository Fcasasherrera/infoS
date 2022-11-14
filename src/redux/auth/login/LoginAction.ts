import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import CustomAxios from '../../../network/CustomAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Body {
  username: string;
  password: string;
}

export const LoginAction = createAsyncThunk('SET_LOGIN', async (body: Body) => {
  try {
    if (body.username === '' || body.password === '') {
      return {
        error: true,
        errorMessage: 'loginScreen.errorMessage',
      };
    }
    const data = {...body};
    const url: string = 'sessions/login';
    const response = await CustomAxios.post(url, data);
    console.log('RESP LOGIN => ', response.data);
    const user = response?.data?.session?.user ?? {};
    const token = response?.data?.session?.token ?? '';
    const idFile = response?.data?.client?.idFile ?? '';
    await AsyncStorage.setItem('token', token);

    return {user: user, isLogedin: true, idFile: idFile};
  } catch (error: any) {
    console.log('ERROR LOGIN =>', error?.response.data ?? error);
    const respError = error?.response?.data?.error ?? '';
    let errorMessage: string = 'common.error';
    if (respError === 'Invalid credentials') {
      errorMessage = 'requests.login.errorInvalidCredentials';
    }

    return {
      error: true,
      errorMessage: errorMessage,
    };
  }
});

export const CheckIsLogedIn = createAsyncThunk('CHECK_LOGIN', async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return {isLogedin: false};
    }

    const url: string = 'sessions';
    const response: any = await CustomAxios.get(url);

    if (response.data) {
      return {
        user: {
          ...response.data.session.user,
          role: response.data.session.role,
          employee: response.data.session.employee,
        },
        isLogedin: true,
      };
    }
  } catch (error: any) {
    console.log('ERROR LOGIN =>', error?.response.data ?? error);
    await AsyncStorage.clear();
    return {isLogedin: false, error: false};
  }
});

export const CheckHolidays = createAsyncThunk('CHECK_HOLIDAYS', async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return {isLogedin: false};
    }

    const url: string = 'sessions';
    const response: any = await CustomAxios.get(url);

    if (response.data) {
      return {
        user: {
          ...response.data.session.user,
          role: response.data.session.role,
          employee: response.data.session.employee,
        },
        isLogedin: true,
      };
    }
  } catch (error: any) {
    console.log('ERROR LOGIN =>', error?.response.data ?? error);
    await AsyncStorage.clear();
    return {isLogedin: false, error: false};
  }
});

export const SetTokenPushAction = createAsyncThunk(
  'SET_TOKEN_PUSH',
  async (tokenPush: string) => {
    try {
      const data = {pushtoken: tokenPush};
      const url: string = 'devices/pushtoken';

      const response = await CustomAxios.put(url, data);
      // console.log('RESP LOGIN => ', response.data);

      return true;
    } catch (error: any) {
      console.log('ERROR LOGIN =>', error?.response.data ?? error);
      const respError = error?.response?.data?.error ?? '';
      let errorMessage: string = 'common.error';
      if (respError === 'Invalid credentials') {
        errorMessage = 'requests.login.errorInvalidCredentials';
      }

      return {
        error: false,
        errorMessage: errorMessage,
      };
    }
  },
);

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
