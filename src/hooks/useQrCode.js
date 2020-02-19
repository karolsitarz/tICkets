import { useState, useEffect } from 'react';

const RGB = 3;
const pxSize = 2;
const scale = 4;

export const getCodeArray = data => {
  const temp = [];
  const qrSize = Math.sqrt(data.length / RGB) / pxSize;

  for (let i = 0; i < qrSize; i++)
    for (let j = 0; j < qrSize; j++)
      temp[i * qrSize + j] =
        data[(i * qrSize * pxSize + j) * RGB * pxSize] === 0 ? true : false;

  return temp;
};

const useDrawQrCode = (code, canvas) => {
  const [shouldBeRendered, setRendered] = useState(false);

  useEffect(() => {
    if (!shouldBeRendered) return;
    const qrSize = Math.sqrt(code.length);

    const ctx = canvas.getContext('2d');
    canvas.width = qrSize * scale;
    canvas.height = qrSize * scale;
    ctx.fillStyle = '#000000';

    code.forEach((el, i) => {
      if (!el) return;
      const x = (i % qrSize) * scale;
      const y = Math.floor(i / qrSize) * scale;
      ctx.fillRect(x, y, scale, scale);
    });
  }, [shouldBeRendered, code]);

  return () => !shouldBeRendered && setRendered(true);
};

export default useDrawQrCode;
