import {RootState} from '../store';
export const getRegisterTimesSelector = (state: RootState) =>
  state.registerTimes;
