import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import store from 'stores';
import GlobalStyles from 'style/global-styles';
import App from 'components';

ReactDOM.render(
  <>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById('container')
);

(function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
  }
})();
