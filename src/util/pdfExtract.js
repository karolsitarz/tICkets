export { default as getSVGQR } from './qrCode';

const getDataById = (data, i) => ({
  origin: {
    date: data[i - 4],
    time: data[i - 2],
    place: data[i - 6]
  },
  destination: {
    date: data[i - 3],
    time: data[i - 1],
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

  for (let id of ids) {
    const re = new RegExp(`(IC|TLK) ${id}`);
    const key = data.findIndex(val => re.test(val));
    key && temp.push(getDataById(data, key));
  }
  return temp;
};

export default mapData;
