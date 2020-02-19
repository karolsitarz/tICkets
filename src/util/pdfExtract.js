import { getDocument } from 'pdfjs-dist/webpack';
import { getCodeArray } from 'hooks/useQrCode';

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
  if (!ids.length) {
    throw new Error('Could not find travel IDs in the ticket data.');
  }

  const temp = [];
  const buyDate = data.find(val => /^\d{4}-\d{2}-\d{2} /.test(val)).split('-');

  for (let id of ids) {
    const re = new RegExp(`(IC|TLK) ${id}`);
    const key = data.findIndex(val => re.test(val));
    if (key < 0) {
      throw new Error(`Could not find train number of ${id}.`);
    }

    temp.push(getDataById(data, key, buyDate));
  }
  return temp;
};

const getTicketId = data => {
  const i = data.findIndex(el => el === 'Nr biletu');
  if (indexedDB < 0) {
    throw new Error(`Could not find ticket ID.`);
  }
  return data[i + 1].substr(2);
};

const readPDF = e =>
  new Promise((resolve, reject) => {
    const { files } = e.target;
    if (files.length === 0) {
      reject('No file has been selected.');
    }
    if (!files[0]) {
      reject("Can't access file.");
    }

    const fr = new FileReader();
    fr.readAsArrayBuffer(files[0]);
    fr.onload = async e => {
      if (!e.target.result) {
        reject("Can't read the input.");
      }
      const doc = await getDocument(e.target.result).promise;
      if (doc.numPages > 2) {
        reject('Incorrect PDF file.');
      }
      const page = await doc.getPage(1);
      const text = await page.getTextContent();

      await page.getOperatorList();
      page.objs.get('img_p0_2', ({ data }) => {
        const code = getCodeArray(data);
        const items = text.items.map(el => el.str);

        resolve({
          code,
          id: getTicketId(items),
          journeys: mapData(items)
        });
      });
    };
  });

export default readPDF;
