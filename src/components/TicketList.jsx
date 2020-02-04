import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Ticket from './Ticket';

const TicketScrollContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex-grow: 1;
`;
const TicketContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 0 calc(47vw - 275px / 2);
  align-items: flex-end;
  flex-direction: row-reverse;
`;

const TicketList = () => {
  const tickets = useSelector(store => store.tickets);
  return (
    <TicketScrollContainer>
      <TicketContainer>
        {tickets.map(({ id, code, journeys }) => (
          <Ticket key={id} code={code} journeys={journeys} />
        ))}
      </TicketContainer>
    </TicketScrollContainer>
  );
};

export default TicketList;
