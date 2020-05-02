import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { IntlProvider, createIntlCache, createIntl } from 'react-intl'
import messages_pt from "./translations/pt_br.json";
import messages_en from "./translations/en.json";
import { Provider } from 'react-redux';
import { store } from './store';

const messages = {
  'pt': messages_pt,
  'en': messages_en
};
export const language = navigator.language.split(/[-_]/)[0];  // language without region code

export const cache = createIntlCache();
export let intl = createIntl(
  {locale: navigator.language, messages: messages[language]},
  cache
)
export let fmt = intl.formatMessage;

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={navigator.language} key={navigator.language} messages={messages[language]}>
      <Provider store={store}>
        <App />
      </Provider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
