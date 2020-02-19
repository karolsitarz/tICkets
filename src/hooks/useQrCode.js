import { useState, useEffect } from 'react';

const scale = 4;

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
