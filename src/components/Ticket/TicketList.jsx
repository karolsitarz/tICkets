import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Ticket from './Ticket';
import ScrollInput from '../ScrollInput';

const TicketScrollContainer = styled.div`
  display: flex;
  flex-grow: 1;
  > div {
    align-items: flex-end;
  }
`;

const TicketList = () => {
  const { tickets, time } = useSelector(({ tickets, time }) => ({
    time,
    tickets: tickets.sort(
      (a, b) => b.journeys[0].origin.time - a.journeys[0].origin.time
    )
  }));
  return (
    <ScrollInput parent={TicketScrollContainer} horizontal>
      {tickets.map(({ id, code, journeys }) => (
        <Ticket key={id} code={code} journeys={journeys} />
      ))}
    </ScrollInput>
  );
};

export default TicketList;
