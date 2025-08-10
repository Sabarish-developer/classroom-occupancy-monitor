import { AppLayout } from "./layouts/app-layout";
import {Landing} from './pages/landing';
import {Dashboard} from './pages/dashboard';

import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./context";
import { RequireAuth } from "./components/require-auth";

const router = createBrowserRouter([{
  path: "/",
  element: <AppLayout />,
  children: [
    {path: "/", element: <Landing />},
    {path: "/dashboard", element: <RequireAuth> <Dashboard /> </RequireAuth>}
  ]
}])

const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
    
  )
}

export default App;