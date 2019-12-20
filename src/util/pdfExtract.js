const convertDateToMs = (date, time, buyDate) => {
  const [d, m] = date.split('.');
  const y = buyDate[0] * 1 + (m >= buyDate[1] ? 0 : 1);
  return new Date(`${y}-${m}-${d} ${time}`).getTime();
};

const getDataById = (data, i, buyDate) => ({
  origin: {
    time: convertDateToMs(data[i - 4], data[i - 2], buyDate),
    place: data[i - 6]
  },
  destination: {
    time: convertDateToMs(data[i - 3], data[i - 1], buyDate),
    place: data[i - 5]
  },
  train: {
    id: data[i],
    car: data[i + 1],
    seat: data[i + 3]
  },
  distance: data[i + 2]
});

const mapData = data => {
  const ids = data[1].split('/');
  const temp = [];
  const buyDate = data.find(val => /^\d{4}-\d{2}-\d{2} /.test(val)).split('-');

  for (let id of ids) {
    const re = new RegExp(`(IC|TLK) ${id}`);
    const key = data.findIndex(val => re.test(val));
    temp.push(getDataById(data, key, buyDate));
  }
  return temp;
};

export default mapData;
