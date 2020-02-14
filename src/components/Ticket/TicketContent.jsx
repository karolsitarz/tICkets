import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import useTimeStrings from '../../hooks/useTimeStrings';
import { TrainFrontIcon, TrainSideIcon, SeatIcon } from '../Icons';

const StyledTicketContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  padding: 2.5em 1.5em;
  flex-direction: column;
  display: flex;
  color: white;
  transition: opacity 0.25s ease;
  opacity: ${({ _active }) => (_active ? 1 : 0)};
`;

const Date = styled.span`
  font-size: 1.75em;
  opacity: 0.8;
  font-weight: 600;
`;

const City = styled.span`
  font-size: 1.25em;
  font-weight: 600;
`;

const Time = styled.span`
  font-size: 1em;
  opacity: 0.8;
`;

const BottomInfo = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
`;

const TextWithIcon = styled.span`
  display: inline-flex;
  align-items: center;
  > svg {
    margin-right: 0.25em;
    height: 0.8em;
    width: 1em;
  }
`;

const CarSeatInfo = styled.div`
  > ${TextWithIcon}:first-of-type {
    margin-right: 0.75em;
  }
`;

const TicketContent = ({ journey, active }) => {
  const originTime = useTimeStrings(journey.origin.time);
  const destinationTime = useTimeStrings(journey.destination.time);

  return (
    <StyledTicketContent _active={active}>
      <Date>{originTime.date}</Date>
      <City>{journey.destination.place}</City>
      <Time>{destinationTime.time}</Time>
      <City>{journey.origin.place}</City>
      <Time>{originTime.time}</Time>
      <BottomInfo>
        <TextWithIcon>
          <TrainFrontIcon />
          {journey.train.id}
        </TextWithIcon>
        <CarSeatInfo>
          <TextWithIcon>
            <TrainSideIcon />
            {journey.train.car}
          </TextWithIcon>
          <TextWithIcon>
            <SeatIcon />
            {journey.train.seat}
          </TextWithIcon>
        </CarSeatInfo>
      </BottomInfo>
    </StyledTicketContent>
  );
};

TicketContent.propTypes = {
  journey: PropTypes.shape({
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
  }),
  active: PropTypes.bool
};

export default TicketContent;
