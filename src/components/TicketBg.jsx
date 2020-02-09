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
  fill: red;
  width: 100%;
  height: 100%;
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
