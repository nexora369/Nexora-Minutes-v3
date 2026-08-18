import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import './checkout.css';
import './home-enhancements.css';
import './mobile.css';
import './mobile-overrides.css';
import './mobile-redesign.css';
import './mobile-final.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
