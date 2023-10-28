import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        'Error, reload the page! This is to test Error boundary! This is a fallback message!'
      }
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
