import { AppLayout } from "./layouts/app-layout";
import {Landing} from './pages/landing';
import {Dashboard} from './pages/dashboard';
import { LoginCallback } from "./components/login-callback";

import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context";
import { RequireAuth } from "./components/require-auth";
import { GenAi } from "./pages/gen-ai";

const router = createBrowserRouter([
  {
  path: "/",
  element: <AppLayout />,
  children: [
    {path: "/", element: <Landing />},
    {path: "login/callback", element: <LoginCallback />},
    {path: "dashboard", element: <Dashboard />},
    {path: "genai", element: <GenAi />}
  ]
  }
])

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