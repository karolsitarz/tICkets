import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import timeStrings, { hour } from '../util/timeStrings';
import { TimeContext } from '../context/timeContext';

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
  div {
    font-weight: bold;
    font-size: 0.75em;
  }
`;

const StyledJourney = styled.div`
  display: flex;
  padding: 0.5em 1.5em;
  order: ${({ _order }) => _order / 1000};
  ${({ _disabled }) =>
    _disabled &&
    css`
      opacity: 0.5;
      background-color: whitesmoke;
    `};
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
  const [currentTime] = useContext(TimeContext);
  const {
    origin,
    destination,
    train: { car, seat, id }
  } = journeys[0];

  const { time, date } = timeStrings(origin.time, currentTime);

  return (
    <StyledJourney
      _order={origin.time}
      _disabled={destination.time - currentTime < -hour * 1}
    >
      <TimeDate>
        <div>{time}</div>
        {date && <div>{date}</div>}
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

Journey.propTypes = {
  code: PropTypes.arrayOf(PropTypes.bool),
  journeys: PropTypes.arrayOf(PropTypes.object)
};

export default Journey;
