import React, { useState } from 'react';

const initial = new Date().getTime();

const TimeContext = React.createContext([initial, () => {}]);

const TimeProvider = props => {
  const [state, setState] = useState(initial);
  return (
    <TimeContext.Provider value={[state, setState]}>
      {
        // eslint-disable-next-line react/prop-types
        props.children
      }
    </TimeContext.Provider>
  );
};

export { TimeContext, TimeProvider };
