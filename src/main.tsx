import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ItemDetails from './components/ItemDetails/ItemDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/ItemDetails" element={<ItemDetails />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        'Error, please, reload the page! This is to test Error boundary! This is a fallback message!'
      }
    >
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
