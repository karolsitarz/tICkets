import React, { useContext } from 'react';
import styled from 'styled-components';

import Journey from './Journey';
import { TicketContext } from '../context';

const List = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const JourneyList = () => {
  const [store] = useContext(TicketContext);

  return (
    <List>
      {store.map(data => (
        <Journey key={data.journeys[0].origin.time} {...data} />
      ))}
    </List>
  );
};

export default JourneyList;
