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
import './nexora-ux.css';
import './nexora-final-polish.css';
import './nexora-live-home.css';
import './nexora-spec.css';
import './account-auth.css';
import './account-auth.js';
import './nexora-spec-final.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
