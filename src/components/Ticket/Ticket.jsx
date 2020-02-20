import React, { useState, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import TicketContent from './TicketContent';
import JourneySwitcher from './JourneySwitcher';
import polygonCircle from 'util/polygonCircle';
import { day } from 'util/timeConst';
import useDrawQrCode from 'hooks/useQrCode';
import { ticketActions } from 'stores/tickets';
import DeleteModal from './DeleteModal';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

const TicketContainer = styled.div`
  width: 15em;
  height: 100%;
  min-height: 19em;
  max-height: 25em;
  margin: 0 3vw;
  pointer-events: auto;
  filter: drop-shadow(0 1em 2em #00000040);
  animation: ${fadeIn} 0.5s ease backwards;
`;

const TicketSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  border-radius: 2em;
  transition: transform 0.35s ease;
  transform: rotateY(0);
  overflow: hidden;
  clip-path: ${`polygon(
    0 0,
    ${polygonCircle(2, 4).reduce(
      (acc, { x, y }) => (acc += `calc(50% + ${x}em) ${y}em,`),
      ''
    )}
    100% 0,
    100% 100%,
    ${polygonCircle(2, 4)
      .reverse()
      .reduce(
        (acc, { x, y }) => (acc += `calc(50% + ${x}em) calc(100% - ${y}em),`),
        ''
      )}
    0 100%
  )`};
`;

const TicketBackside = styled(TicketSide)`
  background-image: ${({ _disabled }) =>
    _disabled
      ? `linear-gradient(to bottom left, #5b4568,#9fb2d6)`
      : `linear-gradient(to bottom left, #6c00ae, #76a5ff)`};
  transform: ${({ _flipped }) => _flipped && 'rotateY(-180deg)'};
`;

const TicketContentContainer = styled(TicketSide)`
  transform: ${({ _flipped }) => _flipped && 'rotateY(180deg)'};
  background-image: ${({ _disabled }) =>
    _disabled
      ? `linear-gradient(to bottom right, #5b4568,#9fb2d6)`
      : `linear-gradient(to bottom right, #6c00ae, #76a5ff)`};
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

const Ticket = ({ journeys, code, id }) => {
  const time = useSelector(({ time }) => time);
  const [isFlipped, setFlipped] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [activeJourney, setActiveJourney] = useState(
    (() => {
      for (let i = journeys.length - 1; i >= 0; i--)
        if (journeys[i].origin.time < time) return i;
      return 0;
    })()
  );
  const disabled = journeys[journeys.length - 1].destination.time + day < time;
  const canvas = useRef(null);
  const dispatch = useDispatch();
  const drawQrCode = useDrawQrCode(code, canvas.current);

  const onClickHandle = useCallback(() => {
    if (isFlipped) return;
    if (isDeleting) return;

    setFlipped(true);
    drawQrCode();
    document.addEventListener('click', outClickFlip);
  }, [isFlipped, isDeleting]);

  const outClickFlip = () => {
    setFlipped(false);
    document.removeEventListener('click', outClickFlip);
  };

  const buttonClick = useCallback(step => {
    if (isFlipped) return;
    if (isDeleting) return;
    setActiveJourney(activeJourney + step);
  });

  const deleteClick = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    setDeleting(true);
  });

  const clickCancelDelete = useCallback(() => setDeleting(false));

  const clickConfirmDelete = useCallback(() =>
    dispatch(ticketActions.deleteTicket(id))
  );

  return (
    <TicketContainer onClick={onClickHandle}>
      <TicketBackside _disabled={disabled} _flipped={!isFlipped}>
        <QrContainer>
          <QrCanvas ref={canvas} />
        </QrContainer>
      </TicketBackside>
      <TicketContentContainer _disabled={disabled} _flipped={isFlipped}>
        {journeys.map((el, i) => (
          <TicketContent
            active={i === activeJourney}
            key={el.origin.time}
            journey={el}
            isFirst={i === 0}
            isLast={i === journeys.length - 1}
          />
        ))}
        {journeys.length > 1 && (
          <JourneySwitcher
            left={activeJourney != 0}
            right={activeJourney != journeys.length - 1}
            onClick={buttonClick}
            hidden={isFlipped}
          />
        )}
        <DeleteModal
          visible={isDeleting}
          confirm={clickConfirmDelete}
          cancel={clickCancelDelete}
          toggle={deleteClick}
        />
      </TicketContentContainer>
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
  code: PropTypes.arrayOf(PropTypes.bool),
  id: PropTypes.string
};

export default Ticket;
