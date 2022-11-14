import moment from 'moment';
import {themeLight} from '../constants/colors';
import {CustomMoment} from './CustomMoment';

const enumerateDaysBetweenDates = (
  startDate: string,
  endDate: string,
  type?: string,
) => {
  const dates = [];
  const available = [];

  let currDate = moment(startDate).startOf('day');
  let lastDate = moment(endDate).startOf('day');
  do {
    if (type === 'string') {
      if (
        moment(currDate).weekday() === 6 ||
        moment(currDate).weekday() === 5
      ) {
        dates.push(currDate.clone().format('YYYY-MM-D'));
      } else {
        available.push(currDate.clone().format('YYYY-MM-D'));
      }
    } else {
      if (
        moment(currDate).weekday() === 6 ||
        moment(currDate).weekday() === 5
      ) {
        dates.push(currDate.clone().toDate());
      } else {
        available.push(currDate.clone().toDate());
      }
    }
  } while (currDate.add(1, 'days').diff(lastDate) <= 0);

  return {disabled: dates, available: available};
};

const checkIfMatchDays = (
  disabledDates: Array<any>,
  availableDates: Array<any>,
) => {
  const disabledCheckDates: Array<string> = [];
  disabledDates.map(date => {
    let disabledDate = moment(
      `${date.day}-${date.month}-${date.year}`,
      'D-M-YYYY',
    ).format('YYYY-MM-DD');
    availableDates.map(avaDate => {
      if (disabledDate === moment(avaDate).format('YYYY-MM-DD')) {
        disabledCheckDates.push(disabledDate);
      }
    });
  });

  return [...new Set(disabledCheckDates)];
};

export const getLastDayAvailable = (
  disabledDates: Array<any>,
  selectedDate: string,
  startDate: string,
  endDate: string,
) => {
  //   let hipotetic = 'September 17, 2022';
  //   let hipoteticEnd = moment(hipotetic).toString();
  const currentSelectedDateFormat = moment(selectedDate).format('YYYY-MM-D');
  let endWeekDates = enumerateDaysBetweenDates(startDate, endDate, 'string');
  let disabledCheckDates = checkIfMatchDays(
    disabledDates,
    endWeekDates.available,
  );
  let valuesArr = endWeekDates.available.filter(function (value) {
    let item = value.toString();
    return disabledCheckDates.indexOf(item) == -1;
  });
  //   console.log(valuesArr);
  if (!valuesArr.includes(currentSelectedDateFormat)) {
    // console.log('no es un dia valido', valuesArr[valuesArr.length - 1]);
    return valuesArr[valuesArr.length - 1];
  }
};

export const isAValidDay = (
  disabledDates: Array<any>,
  selectedDate: string,
  startDate: string,
  endDate: string,
) => {
  //   let hipotetic = 'September 17, 2022';
  //   let hipoteticEnd = moment(hipotetic).toString();
  const currentSelectedDateFormat = moment(selectedDate).format('YYYY-MM-D');
  let endWeekDates = enumerateDaysBetweenDates(startDate, endDate, 'string');
  let disabledCheckDates = checkIfMatchDays(
    disabledDates,
    endWeekDates.available,
  );
  let valuesArr = endWeekDates.available.filter(function (value) {
    let item = value.toString();
    return disabledCheckDates.indexOf(item) == -1;
  });
  //   console.log(valuesArr);
  if (!valuesArr.includes(currentSelectedDateFormat)) {
    return false;
  } else {
    return true;
  }
};

export const getDaysCalendar = (
  disabledDates: Array<any>,
  selectedDate: string,
  startDate: string,
  endDate: string,
) => {
  let endWeekDates = enumerateDaysBetweenDates(startDate, endDate);
  //   console.log(endWeekDates.disabled);

  let selectedKey = moment(selectedDate).format('YYYY-MM-D');
  let markedDates: any = {};
  markedDates[selectedKey] = {
    selected: true,
    marked: true,
    selectedColor: themeLight.primaryLigth,
  };
  endWeekDates.disabled.map(day => {
    let dateKey = moment(day).format('YYYY-MM-D');
    markedDates[dateKey] = {disabled: true, disableTouchEvent: true};
  });

  let disabledCheckDates = checkIfMatchDays(
    disabledDates,
    endWeekDates.available,
  );
  if (disabledCheckDates.length > 0) {
    disabledCheckDates.map(date => {
      markedDates[date] = {disabled: true, disableTouchEvent: true};
    });
  }

  return markedDates;
};
