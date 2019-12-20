import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  background-color: #fff;
  box-shadow: 0 -1em 2em #0002;
  width: 100%;
  height: 20em;
  border-radius: 2em 2em 0 0;
  flex-shrink: 0;
  top: calc(100vh - 3em);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Card = () => (
  <StyledCard>
    <span>data</span>
  </StyledCard>
);

export default Card;
