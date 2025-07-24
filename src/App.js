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
    path: "/home",
    Component: Home,
    children: [
      { index: true, Component: Dashboard },
      // { path: "settings", Component: Settings },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
