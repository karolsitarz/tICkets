import React from 'react';
import styled from 'styled-components';

const Main = styled.svg`
  border-radius: 2em;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: var(--h);
`;

const Shape = styled.rect`
  width: 100%;
  height: 100%;
  fill: url(#gradientFill);
`;

const MaskBg = styled.rect`
  width: 100%;
  height: 100%;
  fill: #fff;
`;

const MaskCircle = styled.circle`
  r: 2em;
  fill: #000;
`;

const TicketBg = () => (
  <Main>
    <mask id="ticket-cutout">
      <MaskBg x="0" y="0" />
      <MaskCircle cx="50%" cy="100%" />
      <MaskCircle cx="50%" cy="0" />
    </mask>
    <Shape x="0" y="0" mask="url(#ticket-cutout)" />
  </Main>
);

export default TicketBg;

const GradientSvg = styled.svg`
  height: 0;
  width: 0;
  position: absolute;
  visibility: hidden;
`;
const GradientStop = styled.stop`
  stop-opacity: ${({ _opacity }) => _opacity || 1};
  stop-color: ${({ _color }) => _color || '#fff'};
`;

export const TicketGradient = () => (
  <GradientSvg>
    <defs>
      <linearGradient id="gradientFill" x1="0%" y1="0%" x2="100%" y2="100%">
        <GradientStop offset="0%" _color="#b26eca" />
        <GradientStop offset="100%" _color="#ffcf96" />
      </linearGradient>
    </defs>
  </GradientSvg>
);
