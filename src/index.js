import React from 'react';
import ReactDOM from 'react-dom';

import { TicketProvider } from './context';
import { TimeProvider } from './context/timeContext';
import GlobalStyles from './style/global-styles';
import App from './components';

ReactDOM.render(
  <>
    <GlobalStyles />
    <TicketProvider>
      <TimeProvider>
        <App />
      </TimeProvider>
    </TicketProvider>
  </>,
  document.getElementById('container')
);
