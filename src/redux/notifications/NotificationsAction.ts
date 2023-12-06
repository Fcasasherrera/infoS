import {createAsyncThunk} from '@reduxjs/toolkit';
import CustomAxios from '../../network/CustomAxios';
import {str} from '../../locales/Locale';

export const getUnreadNotifications = createAsyncThunk(
  'GET_NOTIFICATIONS',
  async () => {
    try {
      const url: string = '/notifications';
      // const result = await CustomAxios.get(url);
      const data = [
        {
          status: 3,
          message: 'Nomina Fernando',
          created: new Date().toString(),
        },
      ];
      return {data: data};
    } catch (error: any) {
      console.log('error al traer notificaciones ', error?.response ?? error);
      const respError = error?.response?.data?.error ?? '';
      let errorMessage: string = 'common.error';
      if (respError === 'Invalid credentials') {
        errorMessage = 'requests.login.errorInvalidCredentials';
      }
      return {
        error: true,
        errorMessage: str(errorMessage),
      };
    }
  },
);
