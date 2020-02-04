import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import timeStrings from '../util/timeStrings';

const TicketContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 275px;
  max-height: 400px;
  background: #bbbbbb;
  padding: 2.5em 1.5em;
  border-radius: 2em;
  margin: 0 3vw;
  font-weight: 600;
  background-image: linear-gradient(to bottom right, #b26eca, #ffcf96);
  color: white;
  height: 100%;
  order: ${props => parseInt(props._order / 120000)};
`;

const Date = styled.span`
  font-size: 40px;
  opacity: 0.8;
`;

const City = styled.span`
  font-size: 24px;
`;

const Time = styled.span`
  font-size: 18px;
  opacity: 0.8;
`;

const Ticket = ({ journeys, code }) => {
  const time = useSelector(store => store.time);
  const originTime = timeStrings(journeys[0].origin.time, time);
  const destinationTime = timeStrings(journeys[0].destination.time, time);
  return (
    <TicketContainer _order={journeys[0].origin.time}>
      <Date>{originTime.date}</Date>
      <City>{journeys[0].destination.place}</City>
      <Time>{destinationTime.time}</Time>
      <City>{journeys[0].origin.place}</City>
      <Time>{originTime.time}</Time>
    </TicketContainer>
  );
};

Ticket.propTypes = {
  journeys: PropTypes.arrayOf(
    PropTypes.shape({
      distance: PropTypes.string,
      origin: PropTypes.shape({
        time: PropTypes.number,
        place: PropTypes.string
      }),
      destination: PropTypes.shape({
        time: PropTypes.number,
        place: PropTypes.string
      }),
      train: PropTypes.shape({
        id: PropTypes.string,
        car: PropTypes.string,
        seat: PropTypes.string
      })
    })
  ),
  code: PropTypes.arrayOf(PropTypes.bool)
};

export default Ticket;
