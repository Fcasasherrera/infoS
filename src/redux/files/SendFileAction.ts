import CustomAxiosMultipart from '../../network/CustiomAxiosMultipart';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {str} from '../../locales/Locale';

// Esta seccion fue modificada temporalmente para realizar pruebas cuando el api estaba caida.
// Devolver a su estado anterior cuando este habilitado el endpoint
export const sendFileAction = createAsyncThunk(
  'POST_SENDFILE',
  async (file: any) => {
    try {
      const data = new FormData();
      data.append('image', file);
      const url = '/files';
      const result = await CustomAxiosMultipart.post(url, data);
      const resp = result.data ?? [];
      // console.log(resp);
      return resp;
    } catch (error: any) {
      console.log('error al enviar el file', error?.response.data ?? error);
      if (error.code === 'F002') {
        return {
          error: true,
          errorMessage: str('noticeFormScreen.errorMessage'),
        };
      }
      return {
        error: true,
        errorMessage: str('common.error'),
      };
    }
  },
);
