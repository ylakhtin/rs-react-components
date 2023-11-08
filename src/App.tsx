import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainLayout from './components/MainLayout/MainLayout';
import ItemDetails from './components/ItemDetails/ItemDetails';
import ItemList from './components/ItemList/ItemList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
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

const App = function () {
  return <RouterProvider router={router} />;
};

export default App;
