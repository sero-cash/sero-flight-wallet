import React from 'react';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd-mobile';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <App />
  </LocaleProvider>
  , document.getElementById('root')
);
// registerServiceWorker();
