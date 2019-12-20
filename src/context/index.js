import React, { useState } from 'react';

const initial = (localStorage.data && JSON.parse(localStorage.data)) || [];

const TicketContext = React.createContext([initial, () => {}]);

const TicketProvider = props => {
  const [state, setState] = useState(initial);
  const handleSet = data => {
    localStorage.data = JSON.stringify(data);
    setState(data);
  };
  return (
    <TicketContext.Provider value={[state, handleSet]}>
      {
        // eslint-disable-next-line react/prop-types
        props.children
      }
    </TicketContext.Provider>
  );
};

export { TicketContext, TicketProvider };
