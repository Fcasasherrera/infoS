import {createReducer} from '@reduxjs/toolkit';
import {getEntryTime, sendEntryTime, sendExitTime} from './RegisterTimesAction';
import {str} from '../../locales/Locale';

interface SendEntryState {
  currentDayInfo: any;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const INITIAL_STATE: SendEntryState = {
  currentDayInfo: {},
  loading: false,
  error: false,
  errorMessage: str('newRequests.noSend'),
};

const sendEntryReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(getEntryTime.pending, state => {
      return {...state, loading: true};
    })
    .addCase(getEntryTime.fulfilled, (state, action) => {
      return {...state, loading: false, ...action.payload};
    })
    .addCase(getEntryTime.rejected, state => {
      return {...state, loading: false, error: true};
    })
    .addCase(sendEntryTime.pending, state => {
      return {...state, loading: true};
    })
    .addCase(sendEntryTime.fulfilled, (state, action) => {
      return {...state, loading: false, ...action.payload};
    })
    .addCase(sendEntryTime.rejected, state => {
      return {...state, loading: false, error: true};
    })
    .addCase(sendExitTime.pending, state => {
      return {...state, loading: true};
    })
    .addCase(sendExitTime.fulfilled, (state, action) => {
      return {...state, loading: false, ...action.payload};
    })
    .addCase(sendExitTime.rejected, state => {
      return {...state, loading: false, error: true};
    });
});

export default sendEntryReducer;
