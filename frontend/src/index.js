import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import StockSentiment from './StockSentiment';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <StockSentiment />
  </React.StrictMode>,
  document.getElementById('root')
);
