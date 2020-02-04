import React from 'react';
import styled from 'styled-components';

import TicketList from './TicketList';
import AddTicket from './AddTicket';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e5e5e5;
  height: 100%;
`;

const Titles = styled.div`
  margin: 3em;
`;

const App = () => {
  return (
    <>
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
