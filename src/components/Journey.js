import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledJourney = styled.div`

`;

const Journey = ({ journeys, code }) => {
  const { origin, destination, train, distance } = journeys[0];

  return (
    <div>
      <h1>{destination.place}</h1>
      <h2>{origin.place}</h2>
      <h4>{train.car}</h4>
      <h4>{train.seat}</h4>
    </div>
  );
};

export default Journey;
