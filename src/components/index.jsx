import React from 'react';
import styled from 'styled-components';

import AddTicket from './AddTicket';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding-bottom: 3em;
  overflow-y: auto;
`;

const App = () => {
  return (
    <>
      <Container>
        <AddTicket />
      </Container>
    </>
  );
};

export default App;
