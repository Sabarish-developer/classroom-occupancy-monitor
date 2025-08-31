import { AppLayout } from "./layouts/app-layout";
import {Landing} from './pages/landing';
import {Dashboard} from './pages/dashboard';
import { LoginCallback } from "./components/login-callback";

import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context";
import { RequireAuth } from "./components/require-auth";
import { GenAi } from "./pages/gen-ai";
import { AdminDashboard } from "./pages/admin-dashboard";

const router = createBrowserRouter([
  {
  path: "/",
  element: <AppLayout />,
  children: [
    {path: "/", element: <Landing />},
    {path: "login/callback", element: <LoginCallback />},
    {path: "dashboard", element: <RequireAuth><Dashboard /></RequireAuth>},
    {path: "genai", element: <RequireAuth><GenAi /></RequireAuth>},
    {path: "admin-dashboard", element: <AdminDashboard />}
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