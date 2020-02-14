import React from 'react';
import { useSelector } from 'react-redux';

const hour = 1000 * 60 * 60;
const day = hour * 24;
const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];
const today = 'Today';
const writeWith0 = val => (val < 10 ? `0${val}` : val);

const useTimeStrings = time => {
  const timeObj = new Date(time);
  const diff = useSelector(state => time - state.time);

  const displayTime =
    writeWith0(timeObj.getHours()) + ':' + writeWith0(timeObj.getMinutes());

  if (diff < hour * -6 || diff > day * 6)
    return {
      time: displayTime,
      date:
        writeWith0(timeObj.getDate()) +
        '.' +
        writeWith0(timeObj.getMonth() * 1 + 1)
    };

  if (diff > hour * 18)
    return {
      time: displayTime,
      date: weekDays[timeObj.getDay()]
    };

  return {
    time: displayTime,
    date: today
  };
};

export default useTimeStrings;
