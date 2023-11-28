import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: "/",
    element:<HomePage />,
    errorElement:<ErrorPage />,
  },
  {
    path: "/dashboard/:uid",
    element:<DashboardPage />,
    errorElement:<ErrorPage />,
  },
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
