const RGB = 3;
const pxSize = 2;
const scale = 4;

export default data => {
  const temp = [];
  const qrSize = Math.sqrt(data.length / RGB) / pxSize;

  for (let i = 0; i < qrSize; i++)
    for (let j = 0; j < qrSize; j++)
      temp[i * qrSize + j] = data[(i * qrSize * pxSize + j) * RGB * pxSize];

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${qrSize * scale} ${qrSize * scale}`);
  // svg.style.maxWidth = '500px';

  temp.forEach((el, i) => {
    if (el < 250) {
      const point = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
      );
      point.setAttribute('width', scale);
      point.setAttribute('height', scale);
      point.setAttribute('x', (i % qrSize) * scale);
      point.setAttribute('y', Math.floor(i / qrSize) * scale);
      // point.style.shapeRendering = 'crispEdges';
      svg.appendChild(point);
    }
  });
  return svg;
};
