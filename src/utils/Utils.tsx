import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const calculateDifferenceWeekDays = (
  startDate: string,
  endDate: string,
): number => {
  const from = moment(startDate);
  const to = moment(endDate);

  if (from.isAfter(to)) {
    return 0;
  }
  let weekendDayCount = 0;

  const fromDate = new Date(startDate);
  const toDate = new Date(endDate);

  while (fromDate < toDate) {
    if (fromDate.getDay() === 0 || fromDate.getDay() === 6) {
      ++weekendDayCount;
    }
    fromDate.setDate(fromDate.getDate() + 1);
  }
  const daysDiff = to.diff(from, 'days') + 1;

  return daysDiff - weekendDayCount;
};

export const increaseBrightness = (hex: string, percent: number) => {
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, '');

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (hex.length == 3) {
    hex = hex.replace(/(.)/g, '$1$1');
  }

  var r = parseInt(hex.substr(0, 2), 16),
    g = parseInt(hex.substr(2, 2), 16),
    b = parseInt(hex.substr(4, 2), 16);

  return (
    '#' +
    (0 | ((1 << 8) + r + ((256 - r) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + g + ((256 - g) * percent) / 100)).toString(16).substr(1) +
    (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
  );
};
export const getRandomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);
