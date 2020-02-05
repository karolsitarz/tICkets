import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import timeStrings from '../util/timeStrings';
import drawQrOnCanvas from '../util/qrCode';

const TicketContainer = styled.div`
  width: 275px;
  height: 100%;
  max-height: 400px;
  margin: 0 3vw;
  pointer-events: auto;
`;

const TicketBackside = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  border-radius: 2em;
  background-image: linear-gradient(to bottom right, #b26eca, #ffcf96);
  transition: transform 0.25s ease;
  transform: ${({ _flipped }) =>
    _flipped ? 'rotateX(-180deg)' : 'rotateX(0)'};
  backface-visibility: hidden;
  box-shadow: 0 1em 2em #00000040;
`;

const TicketContent = styled(TicketBackside)`
  display: flex;
  flex-direction: column;
  padding: 2.5em 1.5em;
  font-weight: 600;
  color: white;
  transform: ${({ _flipped }) => (_flipped ? 'rotateX(180deg)' : 'rotateX(0)')};
`;

const QrContainer = styled.div`
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 2em;
  background-color: #fff;
  transition: opacity 0.25s ease;
  opacity: ${({ _flipped }) => (_flipped ? 0 : 1)};

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
  const [isFlipped, setFlipped] = useState(false);
  const canvas = useRef(null);
  const time = useSelector(store => store.time);
  const originTime = timeStrings(journeys[0].origin.time, time);
  const destinationTime = timeStrings(journeys[0].destination.time, time);
  const onClickHandle = e => {
    if (isFlipped) return;

    setFlipped(true);
    document.addEventListener('click', outClick);
  };
  const outClick = () => {
    setFlipped(false);
    document.removeEventListener('click', outClick);
  };

  useLayoutEffect(() => {
    drawQrOnCanvas(code, canvas.current);
  });

  return (
    <TicketContainer onClick={onClickHandle}>
      <TicketContent _flipped={isFlipped}>
        <Date>{originTime.date}</Date>
        <City>{journeys[0].destination.place}</City>
        <Time>{destinationTime.time}</Time>
        <City>{journeys[0].origin.place}</City>
        <Time>{originTime.time}</Time>
        <span>{journeys[0].train.id}</span>
        <span>{journeys[0].train.car}</span>
        <span>{journeys[0].train.seat}</span>
      </TicketContent>
      <TicketBackside _flipped={!isFlipped}>
        <QrContainer _flipped={!isFlipped}>
          <QrCanvas ref={canvas} />
        </QrContainer>
      </TicketBackside>
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
