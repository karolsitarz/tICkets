import React from 'react';
import styled from 'styled-components';

import TicketList from './TicketList';
import AddTicket from './AddTicket';
import { TicketGradient } from './TicketBg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e5e5e5;
  height: 100%;
  overflow: hidden;
  &::before {
    content: '';
    position: fixed;
    background: #dbdbdb;
    width: 200vh;
    min-width: 150vw;
    height: 100vh;
    left: 50%;
    bottom: -50vh;
    border-radius: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
`;

const Titles = styled.div`
  margin: 2em;
`;

const App = () => {
  return (
    <>
      <TicketGradient />
      <Container>
        <Titles>
          <h1>Hello, there! 👋</h1>
          <h3>Where are we going today?</h3>
        </Titles>
        <TicketList />
        <AddTicket />
      </Container>
    </>
  );
};

export default App;
