const polygonCircle = (size, steps) => {
  const data = [];
  const step = size / ((steps * (steps + 1)) / 2) / 2;
  let progress = 0;

  for (let i = 1; i <= steps * 4; i++) {
    // for steps = 5
    // 1 2 3 4 5 5 4 3 2 1 1 2 ..
    const n =
      Math.abs((parseInt(i / steps) % 2) * (steps - 1) - (i % steps)) + 1;
    progress += n;
    const x = (-size + step * progress).toFixed(3);
    const y = Math.sqrt(size ** 2 - x ** 2).toFixed(3);
    data[i] = { x, y };
  }
  return [{ x: -size, y: 0 }, ...data];
};

export default polygonCircle;
