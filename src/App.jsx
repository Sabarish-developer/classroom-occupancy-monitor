import { AppLayout } from "./layouts/app-layout";

import {Landing} from './pages/landing';
import {Dashboard} from './pages/dashboard';

import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";

const router = createBrowserRouter([{
  path: "/",
  element: <AppLayout />,
  children: [
    {path: "/", element: <Landing />},
    {path: "/dashboard", element: <Dashboard />}
  ]
}])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;