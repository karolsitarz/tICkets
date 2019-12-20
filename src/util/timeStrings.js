export const hour = 1000 * 60 * 60;
export const day = hour * 24;

const weekDays = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt'];

const writeWith0 = val => (val < 10 ? '0' + val : val);

export default time => {
  const current = new Date().getTime();
  const timeObj = new Date(time);

  const displayTime =
    writeWith0(timeObj.getHours()) + ':' + writeWith0(timeObj.getMinutes());

  const diff = time - current;

  if (diff < 0 || diff > day * 6)
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
    date: null
  };
};
