import React, { useContext } from 'react';
import styled from 'styled-components';

import Journey from './Journey';
import { TicketContext } from '../context';

const List = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: stretch;
  padding: 1em 0;
  flex-grow: 1;
`;

const JourneyList = () => {
  const [store] = useContext(TicketContext);

  return (
    <List>
      {store.map(data => (
        <Journey key={data.id} {...data} />
      ))}
    </List>
  );
};

export default JourneyList;
