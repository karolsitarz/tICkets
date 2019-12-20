import React from 'react';
import styled from 'styled-components';

import Navbar from './Navbar';
import JourneyList from './JourneyList';
import Card from './Card';

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

const App = () => (
  <>
    <Container>
      <Navbar />
      <JourneyList />
    </Container>
    <Card />
  </>
);

export default App;
