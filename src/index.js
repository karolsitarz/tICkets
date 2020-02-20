import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import store from 'stores';
import GlobalStyles from 'components/GlobalStyles';
import App from 'components';
import enableServiceWorker from 'util/serviceWorker';

const Main = () => (
  <>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </>
);

ReactDOM.render(<Main />, document.getElementById('container'));
// enableServiceWorker();
