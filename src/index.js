import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './app/store';


import ScrollToTop from "./services/ScrollToTop";






ReactDOM.render(
  <Router basename={'/serverstone'}>
    <ScrollToTop>
    <Provider store={store}>
       <App />
    </Provider>
   </ScrollToTop>
  </Router>,
  document.getElementById('root')
);



