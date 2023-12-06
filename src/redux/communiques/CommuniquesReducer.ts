import {createReducer} from '@reduxjs/toolkit';
import {
  deleteComApi,
  getListCommuniquesAPI,
  getNextPageList,
  HideAlert,
  HideSuccessAlert,
  postNewApi,
  updateNewsApi,
} from './CommuniquesAction';

interface CommuniquesState {
  data: any;
  newsItems: any;
  loading: boolean;
  success: boolean;
  error: boolean;
  errorMessage: string;
}

const INITIAL_STATE: CommuniquesState = {
  data: [],
  newsItems: {
    page: 0,
    limit: 3,
    items: [],
  },
  loading: false,
  success: false,
  error: false,
  errorMessage: 'Error al obtener la lista',
};

const listNewsReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(getListCommuniquesAPI.pending, state => {
      return {...state, loading: true};
    })
    .addCase(getListCommuniquesAPI.fulfilled, (state, action) => {
      const slicedArray = action.payload.data.slice(0, state.newsItems.limit);
      return {
        ...state,
        loading: false,
        ...action.payload,
        newsItems: {...state.newsItems, page: 0, items: slicedArray},
      };
    })
    .addCase(getListCommuniquesAPI.rejected, state => {
      return {...state, loading: false, error: true};
    })
    .addCase(postNewApi.pending, state => {
      return {...state, loading: true};
    })
    .addCase(postNewApi.fulfilled, (state, action) => {
      return {...state, loading: false, ...action.payload};
    })
    .addCase(postNewApi.rejected, state => {
      return {...state, loading: false, error: true};
    })
    .addCase(updateNewsApi.pending, state => {
      return {...state, loading: true};
    })
    .addCase(updateNewsApi.fulfilled, (state, action) => {
      return {...state, loading: false, ...action.payload};
    })
    .addCase(updateNewsApi.rejected, state => {
      return {...state, loading: false, error: true};
    })
    .addCase(deleteComApi.pending, state => {
      return {...state, loading: true};
    })
    .addCase(deleteComApi.fulfilled, (state, action) => {
      return {...state, loading: false};
    })
    .addCase(deleteComApi.rejected, state => {
      return {...state, loading: false, error: true};
    })
    .addCase(HideAlert, state => {
      return {
        ...state,
        error: false,
        errorMessage: 'Ha ocurrido un error',
      };
    })
    .addCase(HideSuccessAlert, state => {
      return {
        ...state,
        success: false,
      };
    })
    .addCase(getNextPageList, (state, action) => {
      const {limit, page} = state.newsItems;
      const pagevalue = page + 1;
      const responseJson = state.data.slice(
        pagevalue * limit,
        (pagevalue + 1) * limit,
      );

      // console.log('akljshd', responseJson);
      return {
        ...state,
        newsItems: {
          ...state.newsItems,
          page: pagevalue,
          items: [...state.newsItems.items, ...responseJson],
        },
      };
    });
});

export default listNewsReducer;
