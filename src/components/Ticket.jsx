import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import timeStrings from '../util/timeStrings';
import drawQrOnCanvas from '../util/qrCode';
import { TrainFrontIcon, TrainSideIcon, SeatIcon } from './Icons';
import polygonCircle from '../util/polygonCircle';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

const TicketContainer = styled.div`
  width: 15em;
  height: 100%;
  max-height: 25em;
  margin: 0 3vw;
  pointer-events: auto;
  filter: drop-shadow(0 1em 2em #00000040);
  animation: ${fadeIn} 0.5s ease backwards;
`;

const TicketBackside = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  border-radius: 2em;
  background-image: linear-gradient(to bottom left, #db40f7, #ffcb3f);
  transition: transform 0.35s ease;
  transform: ${({ _flipped }) =>
    _flipped ? 'rotateY(-180deg)' : 'rotateY(0)'};
  clip-path: ${`polygon(
    0 0,
    ${polygonCircle(2, 5).reduce(
      (acc, { x, y }) =>
        (acc += `calc(50% + ${x.toFixed(3)}em) ${y.toFixed(3)}em,`),
      ''
    )}
    100% 0,
    100% 100%,
    ${polygonCircle(2, 5)
      .reverse()
      .reduce(
        (acc, { x, y }) =>
          (acc += `calc(50% + ${x.toFixed(3)}em) calc(100% - ${y.toFixed(
            3
          )}em),`),
        ''
      )}
    0 100%
  )`};
`;

const TicketContent = styled(TicketBackside)`
  display: flex;
  flex-direction: column;
  padding: 2.5em 1.5em;
  color: white;
  transform: ${({ _flipped }) => (_flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
  background-image: linear-gradient(to bottom right, #db40f7, #ffcb3f);
  backface-visibility: hidden;
`;

const QrContainer = styled.div`
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 2em;
  background-color: #fff;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const QrCanvas = styled.canvas`
  position: absolute;
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
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

const Ticket = ({ journeys, code }) => {
  const [isFlipped, setFlipped] = useState(false);
  const [isFirstFlip, setFirstFlip] = useState(false);
  const canvas = useRef(null);
  const time = useSelector(store => store.time);
  const originTime = timeStrings(journeys[0].origin.time, time);
  const destinationTime = timeStrings(journeys[0].destination.time, time);

  const onClickHandle = useCallback(() => {
    if (isFlipped) return;

    setFlipped(true);
    if (!isFirstFlip) setFirstFlip(true);
    document.addEventListener('click', outClick);
  }, [isFlipped]);

  const outClick = () => {
    setFlipped(false);
    document.removeEventListener('click', outClick);
  };

  useEffect(() => {
    if (!isFirstFlip) return;
    drawQrOnCanvas(code, canvas.current);
  }, [isFirstFlip]);

  return (
    <TicketContainer onClick={onClickHandle}>
      <TicketBackside _flipped={!isFlipped}>
        <QrContainer>
          <QrCanvas ref={canvas} />
        </QrContainer>
      </TicketBackside>
      <TicketContent _flipped={isFlipped}>
        <Date>{originTime.date}</Date>
        <City>{journeys[0].destination.place}</City>
        <Time>{destinationTime.time}</Time>
        <City>{journeys[0].origin.place}</City>
        <Time>{originTime.time}</Time>
        <BottomInfo>
          <TextWithIcon>
            <TrainFrontIcon />
            {journeys[0].train.id}
          </TextWithIcon>
          <CarSeatInfo>
            <TextWithIcon>
              <TrainSideIcon />
              {journeys[0].train.car}
            </TextWithIcon>
            <TextWithIcon>
              <SeatIcon />
              {journeys[0].train.seat}
            </TextWithIcon>
          </CarSeatInfo>
        </BottomInfo>
      </TicketContent>
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
