import PDFJS, { getDocument } from 'pdfjs-dist/webpack';

const mappedData = data => ({
  origin: {
    date: data[20].str,
    time: data[22].str,
    place: data[24].str
  },
  destination: {
    date: data[29].str,
    time: data[31].str,
    place: data[27].str
  },
  ticket: {
    price: data[37].str,
    id: data[40].str.substring(2)
  },
  train: {
    id: data[57].str,
    class: data[33].str,
    car: data[58].str,
    seat: data[60].str
  },
  distance: data[59].str
});

const generateSVGfromArray = (array, qrSize) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${qrSize} ${qrSize}`);
  svg.style.width = '10em';

  array.forEach((el, i) => {
    if (el < 250) {
      const point = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      point.setAttribute('width', 1);
      point.setAttribute('height', 1);
      point.setAttribute('y', Math.floor(i / qrSize));
      point.setAttribute('x', i % qrSize);
      point.style.shapeRendering = 'crispEdges';
      svg.appendChild(point);
    }
  });
  document.body.appendChild(svg);
};

document.getElementById('file').addEventListener('change', async e => {
  const { files } = e.target;
  if (files.length === 0) return;
  if (!files[0]) return;
  const fr = new FileReader();
  fr.readAsArrayBuffer(files[0]);
  fr.onload = async e => {
    if (!e.target.result) return;
    const doc = await getDocument(e.target.result).promise;
    const page = await doc.getPage(1);
    const text = await page.getTextContent();
    // if (text.items[7].str !== '"PKP Intercity"') {
    //   console.log('incorrect ticket', text.items);
    //   return;
    // }

    await page.getOperatorList();
    page.objs.get('img_p0_2', img => {
      const { height, width, data } = img;
      const RGB = 3;
      const pxSize = 2;
      const qrSize = Math.sqrt(data.length / RGB) / pxSize;

      const temp = [];

      for (let i = 0; i < qrSize; i++)
        for (let j = 0; j < qrSize; j++)
          temp[i * qrSize + j] = Math.round(
            data[(i * qrSize * pxSize + j) * RGB * pxSize]
          );

      generateSVGfromArray(temp, qrSize);
      console.log({
        items: text.items.map(e => e.str),
        a: page.objs
      });

      console.log({
        ...mappedData(text.items),
        qr: temp
      });
    });
  };
});
