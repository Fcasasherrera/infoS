import moment from 'moment';
import {localLang} from '../locales/Locale';
import 'moment/locale/es';

export const CustomMoment = (date: string, format?: string | undefined) =>
  moment(date)
    .locale(localLang)
    .format(format ?? 'MMMM D, YYYY');
export const MomentSubAdd = (
  date: string,
  type: string,
  days?: number | undefined,
) => {
  if (type === '+') {
    return moment(date)
      .locale(localLang)
      .add(days, 'days')
      .format('MMMM D, YYYY');
  } else {
    return moment(date)
      .locale(localLang)
      .subtract(days, 'days')
      .format('MMMM D, YYYY');
  }
};
