import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import useTimeStrings from '../../hooks/useTimeStrings';
import { hour } from '../../util/timeConst';
import {
  TrainFrontIcon,
  TrainSideIcon,
  SeatIcon,
  LocationIcon
} from '../Icons';

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

const Location = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.5em;
  margin: 0.25em 0;
`;
const LocationIconContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 1.75em;
  left: 0;
  top: 0;
  transform: translateX(-33%);
`;

const TicketContent = ({ journey, active, isFirst, isLast }) => {
  const originTime = useTimeStrings(journey.origin.time);
  const destinationTime = useTimeStrings(journey.destination.time);
  const time = useSelector(({ time }) => time);
  // TODO: UPDATE ICONS
  return (
    <StyledTicketContent _active={active}>
      <Date>{originTime.date}</Date>
      <Location>
        <City>{journey.destination.place}</City>
        <Time>{destinationTime.time}</Time>
        <LocationIconContainer>
          <LocationIcon
            isCurrent={journey.destination.time < time}
            isLast={isLast}
          />
        </LocationIconContainer>
      </Location>
      <Location>
        <City>{journey.origin.place}</City>
        <Time>{originTime.time}</Time>
        <LocationIconContainer>
          <LocationIcon
            isCurrent={journey.origin.time - hour * 12 < time}
            isFirst={isFirst}
          />
        </LocationIconContainer>
      </Location>
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
  active: PropTypes.bool,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool
};

export default TicketContent;
