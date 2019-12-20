const RGB = 3;
const pxSize = 2;
const scale = 4;

const getQrSize = data => Math.sqrt(data.length / RGB) / pxSize;

export const getCodeArray = data => {
  const temp = [];
  const qrSize = getQrSize(data);

  for (let i = 0; i < qrSize; i++)
    for (let j = 0; j < qrSize; j++)
      temp[i * qrSize + j] =
        data[(i * qrSize * pxSize + j) * RGB * pxSize] === 0 ? true : false;

  return temp;
};

const drawQrOnCanvas = (array, canvas) => {
  const qrSize = Math.sqrt(array.length);

  const ctx = canvas.getContext('2d');
  canvas.width = qrSize * scale;
  canvas.height = qrSize * scale;
  ctx.fillStyle = '#000000';

  array.forEach((el, i) => {
    if (!el) return;
    const x = (i % qrSize) * scale;
    const y = Math.floor(i / qrSize) * scale;
    ctx.fillRect(x, y, scale, scale);
  });
  return canvas;
};

export default drawQrOnCanvas;
