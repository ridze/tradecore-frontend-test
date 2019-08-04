import React from 'react';
import ReactDOM from 'react-dom';
import TradecoreTestApp from './containers/Main';
import * as serviceWorker from './serviceWorker';

import './assets/global.css';
import './assets/vendor.css';

ReactDOM.render(<TradecoreTestApp />, document.getElementById('tradecore-test-app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
