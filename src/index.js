import { getDocument } from 'pdfjs-dist/webpack';
import mapData from './util/pdfExtract';
import getCanvas, { getCodeArray } from './util/qrCode';

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
    page.objs.get('img_p0_2', ({ data }) => {
      const array = getCodeArray(data);
      document.body.appendChild(getCanvas(array));
      console.log({
        code: array,
        journeys: mapData(text.items.map(el => el.str))
      });
    });
  };
});
