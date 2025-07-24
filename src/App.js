import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SignIn, Dashboard, Home } from './pages/index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
   {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      { index: true, Component: Home },
      // { path: "settings", Component: Settings },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
