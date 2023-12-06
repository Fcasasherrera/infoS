import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import CustomAxios from '../../network/CustomAxios';
import {str} from '../../locales/Locale';
import News, {NewsRequest} from '../../types/news';

export const getListCommuniquesAPI = createAsyncThunk(
  'SET_LISTNEWS',
  async () => {
    try {
      const url: string = '/news';
      // const result = await CustomAxios.get(url);
      const data = [
        {
          id: 1,
          idClient: 2,
          idType: 1,
          idUser: 1,
          title: 'Solicita tus vacaciones pronto...!',
          body: 'En estos meses de noviembre y diciembre habla con tu lead y solicita tus vacaciones',
          created: new Date().toString(),
          // extras
          thumbnailData: {},
          fileData: {
            type: 'image/jpg',
            url: 'https://imageio.forbes.com/specials-images/imageserve/647facd9f5654bc6b057b386/Couple-relax-on-the-beach-enjoy-beautiful-sea-on-the-tropical-island/960x0.jpg?format=jpg&width=960',
          },
        },
        {
          id: 2,
          idClient: 2,
          idType: 2,
          idUser: 1,
          title: 'Ya es fin de mes..!',
          body: 'Ahora que estamos cerca del fin de mes, recuerda estar atento a tus responsabilidades',
          created: new Date().toString(),
          // extras
          thumbnailData: {},
          fileData: {
            type: 'image/jpg',
            url: 'https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2017/08/18/15030512526621.jpg',
          },
        },
      ];
      return {data: data};
    } catch (error: any) {
      console.log('error al traer noticias 2 ', error?.response ?? error);
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

export const getNextPageList = createAction('NEXT_PAGE_COMMUNICATE_LIST');

export const HideAlert = createAction('HIDE_ALERT');
export const HideSuccessAlert = createAction('HIDE_S_ALERT');

export const postNewApi = createAsyncThunk(
  'POST_NEW',
  async (news: NewsRequest) => {
    try {
      const url = '/news';
      const result = await CustomAxios.post(url, news);
      const data = result?.data ?? [];
      // console.log(data);
      return {success: true};
    } catch (error: any) {
      console.log('error al enviar noticia ', error?.response.data ?? error);
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

export const updateNewsApi = createAsyncThunk(
  'UPDATE_NEW',
  async (news: News) => {
    try {
      let newData = {...news, idType: news.type};
      const result = await CustomAxios.put(`/news/${news.id}`, newData);
      const data = result?.data ?? [];
      // console.log(news, '-------- RESPONSE ---------');
      return {success: true};
    } catch (error: any) {
      console.log('error al enviar noticia ', error?.response.data ?? error);
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

export const deleteComApi = createAsyncThunk(
  'DELETE_NEW',
  async (idStatement: number) => {
    try {
      const result = await CustomAxios.delete(`/news/${idStatement}`);
      const data = result?.data ?? [];
      // console.log(data);
      return true;
    } catch (error: any) {
      console.log('error al borrar noticia ', error?.response.data ?? error);
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
