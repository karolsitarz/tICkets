export const hour = 1000 * 60 * 60;
export const day = hour * 24;

const weekDays = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt'];

const writeWith0 = val => (val < 10 ? '0' + val : val);

export default time => {
  const current = new Date().getTime();
  const timeObj = new Date(time);

  const displayTime =
    writeWith0(timeObj.getHours()) + ':' + writeWith0(timeObj.getMinutes());

  if (time - current > 0 && time - current < hour * 18)
    return {
      time: displayTime,
      date: null
    };

  if (time - current > 0 && time - current < day * 6)
    return {
      time: displayTime,
      date: weekDays[timeObj.getDay()]
    };

  return {
    time: displayTime,
    date:
      writeWith0(timeObj.getMonth() * 1 + 1) +
      '.' +
      writeWith0(timeObj.getDate())
  };
};
