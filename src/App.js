import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SignIn } from './pages/index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
