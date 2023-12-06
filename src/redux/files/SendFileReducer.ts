import {createReducer} from '@reduxjs/toolkit';
import {sendFileAction} from './SendFileAction';
import {str} from '../../locales/Locale';

interface SendFileState {
  data: any;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const INITIAL_STATE: SendFileState = {
  data: [],
  loading: false,
  error: false,
  errorMessage: str('newRequests.noSend'),
};

const sendFileReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(sendFileAction.pending, state => {
      return {...state, loading: true};
    })
    .addCase(sendFileAction.fulfilled, (state, action) => {
      return {...state, loading: false, ...action.payload};
    })
    .addCase(sendFileAction.rejected, state => {
      return {...state, loading: false, error: true};
    })
});

export default sendFileReducer;
