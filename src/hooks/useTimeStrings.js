import { useSelector } from 'react-redux';
import { hour, day, weekDays, today, writeWith0 } from '../util/timeConst';

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
