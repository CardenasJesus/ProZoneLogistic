import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/pages/Home'
import RegisterPage from './routes/pages/Register'
import Dashboard from "./routes/pages/Dashboard"
import AdminPage from "./routes/pages/sentspage"
import ProtectedRoute from "./routes/private/protectedRoutes"
import AdministrarColab from "./routes/pages/administrar_col"
import ManagePedidos from "./routes/pages/managePedidos"
import NotFound from './routes/pages/404'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />
  },
  {
    path: "/envios",
    element: <ProtectedRoute element={<AdminPage />} />
  },
  {
    path: "/administrar/colaboradores",
    element: <ProtectedRoute element={<AdministrarColab />}/>
  },
  {
    path: "/administrar/pedidos",
    element: <ProtectedRoute element={<ManagePedidos />}/>
  },
  {
    path: "*",
    element: <NotFound />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
