import {createAsyncThunk} from '@reduxjs/toolkit';
import {str} from '../../locales/Locale';
import axios from 'axios';

// Esta seccion fue modificada temporalmente para realizar pruebas cuando el api estaba caida.
// Devolver a su estado anterior cuando este habilitado el endpoint
export const getFileAction = createAsyncThunk(
  'GET_IDFILE',
  async (idFile: any) => {
    try {
      const url = `http://localhost:3000/files/${idFile}`;
      const result = await axios.get(url);
      const resp = result.data ?? [];
      return resp;
    } catch (error: any) {
      // console.log('error al enviar el file', error?.response.data ?? error);
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
