import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/css/styles.css";
import "./assets/js/scripts.js";
import { App } from './component/App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

