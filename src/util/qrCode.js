const RGB = 3;
const pxSize = 2;

export default data => {
  const temp = [];
  const qrSize = Math.sqrt(data.length / RGB) / pxSize;

  for (let i = 0; i < qrSize; i++)
    for (let j = 0; j < qrSize; j++)
      temp[i * qrSize + j] = data[(i * qrSize * pxSize + j) * RGB * pxSize];

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  // svg.setAttribute('viewBox', `0 0 ${qrSize * 2} ${qrSize * 2}`);
  // svg.style.maxWidth = '500px';

  temp.forEach((el, i) => {
    if (el < 250) {
      const point = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
      );
      point.setAttribute('width', 2);
      point.setAttribute('height', 2);
      point.setAttribute('x', (i % qrSize) * 2);
      point.setAttribute('y', Math.floor(i / qrSize) * 2);
      point.style.shapeRendering = 'crispEdges';
      svg.appendChild(point);
    }
  });
  return svg;
};
