import React, { useContext, useRef, useLayoutEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { TicketContext } from '../context';
import drawQrOnCanvas from '../util/qrCode';

const StyledCard = styled.div`
  background-color: #fff;
  box-shadow: 0 -1em 2em #0002;
  width: 100%;
  padding: 4em 2em 2em;
  text-align: center;
  border-radius: 2em 2em 0 0;
  flex-shrink: 0;
  top: calc(100vh - 3em);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 1.5em;
    width: 5em;
    height: 0.25em;
    background-color: #ddd;
    border-radius: 1em;
  }

  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1.25em;
  }
`;

const getCurrentJourney = store => {
  const time = new Date().getTime();
  for (let el of store) {
    for (let journey of el.journeys)
      if (journey.origin.time <= time && journey.destination.time >= time)
        return {
          code: el.code,
          journey
        };
  }
  return null;
};

const StyledCanvas = styled.canvas`
  width: 10em;
  height: 10em;
  margin: 2em 1em 1em;
`;

const QrContainer = styled.div`
  &::before {
    content: '';
    padding-bottom: 100%;
    display: block;
  }
  width: 90%;
  border-radius: 2em;
  position: absolute;
  top: 50%;
  left: 50%;
  box-shadow: 0 0 5em 0px black;
  z-index: 100;
  background-color: #fff;
  transform: translate3d(-50%, -50%, 0);
  transition: transform 0.1s ease;

  canvas {
    position: absolute;
    width: 70%;
    height: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const BigQrModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0005;
  transition: opacity 0.1s ease;

  ${({ visible }) =>
    !visible &&
    css`
      opacity: 0;
      pointer-events: none;
      > ${QrContainer} {
        transform: translate3d(-50%, -50%, 0) scale(0.95);
      }
    `};
`;

const Card = () => {
  const [store] = useContext(TicketContext);
  const [isBigQR, setBigQR] = useState(false);
  const current = getCurrentJourney(store);
  if (current === null) return null;

  const { code, journey } = current;
  const { origin, destination } = journey;

  const canvasPreview = useRef(null);
  const canvasBig = useRef(null);
  useLayoutEffect(() => {
    if (canvasPreview.current) drawQrOnCanvas(code, canvasPreview.current);
    if (canvasBig.current) drawQrOnCanvas(code, canvasBig.current);
  }, []);

  return (
    <>
      <StyledCard>
        <h1>{destination.place}</h1>
        <h2>{origin.place}</h2>
        <StyledCanvas ref={canvasPreview} onClick={() => setBigQR(true)} />
      </StyledCard>
      <BigQrModal onClick={() => setBigQR(false)} visible={isBigQR}>
        <QrContainer>
          <canvas ref={canvasBig} />
        </QrContainer>
      </BigQrModal>
    </>
  );
};

export default Card;
