import {createReducer} from '@reduxjs/toolkit';
import {getUnreadNotifications} from './NotificationsAction';

interface NotificationsState {
  data: any;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const INITIAL_STATE: NotificationsState = {
  data: [],
  loading: false,
  error: false,
  errorMessage: 'Error al obtener la lista',
};

const listNotificationsReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(getUnreadNotifications.pending, state => {
      return {...state, loading: true};
    })
    .addCase(getUnreadNotifications.fulfilled, (state, action) => {
      return {...state, loading: false, ...action.payload};
    })
    .addCase(getUnreadNotifications.rejected, state => {
      return {...state, loading: false, error: true};
    });
});

export default listNotificationsReducer;
