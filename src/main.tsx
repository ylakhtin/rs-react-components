import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ItemDetails from './components/ItemDetails/ItemDetails';
import ItemList from './components/ItemList/ItemList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/page/1" />} />
      <Route path="/page/:pageNum" element={<ItemList />}>
        <Route path="/page/:pageNum/details/:index" element={<ItemDetails />} />
      </Route>
      <Route path="/page/:pageNum/search/:searchStr" element={<ItemList />}>
        <Route
          path="/page/:pageNum/search/:searchStr/details/:index"
          element={<ItemDetails />}
        />
      </Route>
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
