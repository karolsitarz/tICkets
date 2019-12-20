import React from 'react';
import styled from 'styled-components';

import Navbar from './Navbar';
import JourneyList from './JourneyList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

const App = () => (
  <Container>
    <Navbar />
    <JourneyList />
  </Container>
);

export default App;
