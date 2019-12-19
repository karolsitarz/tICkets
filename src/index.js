import PDFJS, { getDocument } from 'pdfjs-dist/webpack';

const mappedData = data => ({
  origin: {
    date: data[16].str,
    time: data[18].str,
    place: data[20].str
  },
  destination: {
    date: data[25].str,
    time: data[27].str,
    place: data[23].str
  },
  ticket: {
    price: data[33].str,
    id: data[36].str.substring(2)
  },
  train: {
    id: data[53].str,
    class: data[29].str,
    car: data[54].str,
    seat: data[56].str
  },
  distance: data[55].str
});

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
    await page.getOperatorList();
    page.objs.get('img_p0_2', img => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const { height, width, data } = img;

      const buffer = new Uint8ClampedArray(width * height * 4);
      const imageData = ctx.createImageData(width, height);
      for (let i = 0; i < data.length; i += 3) {
        const j = i + i / 3;
        buffer[j] = data[i];
        buffer[j + 1] = data[i + 1];
        buffer[j + 2] = data[i + 2];
        buffer[j + 3] = 255;
      }
      imageData.data.set(buffer);
      ctx.putImageData(imageData, 0, 0);
      console.log({
        ...mappedData(text.items),
        qr: canvas.toDataURL()
      });
    });
  };
});
