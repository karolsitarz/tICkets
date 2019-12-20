import React from 'react';
import ReactDOM from 'react-dom';

import { TicketProvider } from './context';
import GlobalStyles from './style/global-styles';
import App from './components';

ReactDOM.render(
  <>
    <TicketProvider>
      <GlobalStyles />
      <App />
    </TicketProvider>
  </>,
  document.getElementById('container')
);
