import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout/MainLayout';
import ItemDetails from './components/ItemDetails/ItemDetails';
import ItemList from './components/ItemList/ItemList';
import NotFound from './components/NotFound/NotFound';

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Navigate to="/page/1" />} />
      <Route path="/page/:pageNum" element={<ItemList />}>
        <Route path="/page/:pageNum/details/:index" element={<ItemDetails />} />
      </Route>
      <Route path="/page/:pageNum/search/:searchStr" element={<ItemList />}>
        <Route path="/page/:pageNum/search/:searchStr/details/:index" element={<ItemDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export { App, AppRoutes };
