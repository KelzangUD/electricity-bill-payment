import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignIn, Dashboard, Home, Users, Meters } from "./pages/index";

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
      { path: "meters", Component: Meters },
      { path: "users", Component: Users },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
