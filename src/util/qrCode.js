const RGB = 3;
const pxSize = 2;
const scale = 4;

const getQrSize = data => Math.sqrt(data.length / RGB) / pxSize;

const getCodeArray = data => {
  const temp = [];
  const qrSize = getQrSize(data);

  for (let i = 0; i < qrSize; i++)
    for (let j = 0; j < qrSize; j++)
      temp[i * qrSize + j] = data[(i * qrSize * pxSize + j) * RGB * pxSize];

  return temp;
};

const getCanvas = data => {
  const code = getCodeArray(data);
  const qrSize = getQrSize(data);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = qrSize * scale;
  canvas.height = qrSize * scale;
  ctx.fillStyle = '#000000';

  code.forEach((el, i) => {
    const x = (i % qrSize) * scale;
    const y = Math.floor(i / qrSize) * scale;
    if (el < 250) ctx.fillRect(x, y, scale, scale);
  });
  return canvas;
};

export default getCanvas;
