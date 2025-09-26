import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  SignIn,
  Dashboard,
  Home,
  Users,
  Meters,
  BillPayment,
  Report
} from "./pages/index";

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
      { path: "bill-payment", Component: BillPayment },
      { path: "users", Component: Users },
      { path: "report", Component: Report },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
