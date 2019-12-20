import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TimeDate = styled.div`
  width: 3.5em;
  height: 3.5em;
  border-radius: 25%;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 1.5em;
`;

const StyledJourney = styled.div`
  display: flex;
  padding: 0.5em 1.5em;
  h1 {
    font-size: 1.1em;
  }
  h2 {
    font-size: 1em;
  }
  span {
    font-size: 0.8em;
    margin-left: 0.5em;
    margin-right: 2em;
    color: #555;
  }
`;

const Journey = ({ journeys, code }) => {
  const {
    origin,
    destination,
    train: { car, seat, id }
  } = journeys[0];

  console.log(journeys[0]);

  return (
    <StyledJourney>
      <TimeDate>
        <div></div>
        <div></div>
      </TimeDate>
      <div>
        <h1>{destination.place}</h1>
        <h2>{origin.place}</h2>
        <div>
          <span>{car}</span>
          <span>{seat}</span>
          <span>{id}</span>
        </div>
      </div>
    </StyledJourney>
  );
};

export default Journey;
