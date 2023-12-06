import CustomAxios from '../../network/CustomAxios';
import {str} from '../../locales/Locale';
import {createAsyncThunk} from '@reduxjs/toolkit';
import moment from 'moment';

// GET Consulta de Hora de entrada
// Para crear un registro, primero deben hacer una consulta y les devolvera el día actual sin hora de entrada ni salida
export const getEntryTime = createAsyncThunk('GET_CURRENT_DAY', async () => {
  try {
    const url = '/workinghours';
    const result = await CustomAxios.get(url);
    const data = result?.data ?? [];
    // console.log('Id de hora de entrada', data.id);
    return {currentDayInfo: data};
  } catch (error: any) {
    console.log('error al traer noticias 4 ', error?.response ?? error);
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
});

// PUT Actualizar hora de entrada
export const sendEntryTime = createAsyncThunk(
  'PUT_ENTRYTIME',
  async (currentDay: any) => {
    try {
      const data = {checktime: currentDay.checktime};
      const url = `workinghours/${currentDay.id}`;
      const result = await CustomAxios.put(url, data);
      const resp = result?.data ?? [];
      return {currentDayInfo: resp};
    } catch (error: any) {
      console.log(error?.response?.data, 'entry error');
      return {
        error: true,
        errorMessage: str('common.error'),
      };
    }
  },
);

export const sendExitTime = createAsyncThunk(
  'PUT_EXITTIME',
  async (currentDay: any) => {
    try {
      const data = {checkouttime: currentDay.checkouttime};
      const url = `/workinghours/${currentDay.id}`;
      const result = await CustomAxios.put(url, data);
      const resp = result?.data ?? [];
      console.log(resp);
      return {currentDayInfo: resp};
    } catch (error: any) {
      console.log(error?.response?.data, 'entry error');
      return {
        error: true,
        errorMessage: str('common.error'),
      };
    }
  },
);
