import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/pages/Home'
import RegisterPage from './routes/pages/Register'
import Dashboard from "./routes/pages/Dashboard"
import AdminPage from "./routes/pages/sentspage"
import ProtectedRoute from "./routes/private/protectedRoutes"
import AdministrarColab from "./routes/pages/administrar_col"
import ManagePedidos from "./routes/pages/managePedidos"
import ManageClients from "./routes/pages/manageClient"
import CatalogoProductos from "./routes/pages/catalogo_Productos"
import ManageProductos from "./routes/pages/manageProducto"
import ProveedoresPage from "./routes/pages/proveedoresPage"
import LotesPage from './routes/pages/lotespage'
import ManageConductores from './routes/pages/manageConductores'
import VehiculosPage from './routes/pages/vehiculosPage'
import RutasPage from './routes/pages/rutasPage'
import NotFound from './routes/pages/404'
import PedidosShown from './routes/pages/pedidosShown'
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
    element: <ProtectedRoute element={<Dashboard />} allowedRoles={['empleado', 'conductor']} />
  },
  {
    path: "/administrar/envios",
    element: <ProtectedRoute element={<AdminPage />} allowedRoles={['empleado']} />
  },
  {
    path: "/administrar/envios/conductores",
    element: <ProtectedRoute element={<ManageConductores />} allowedRoles={['empleado']} />
  },
  {
    path: "/administrar/envios/vehiculos",
    element: <ProtectedRoute element={<VehiculosPage />} allowedRoles={['empleado']} />
  },
  {
    path: "/administrar/envios/rutas",
    element: <ProtectedRoute element={<RutasPage />} allowedRoles={['empleado']} />
  },
  {
    path: "/administrar/colaboradores",
    element: <ProtectedRoute element={<AdministrarColab />} allowedRoles={['empleado']} />
  },
  {
    path: "/administrar/pedidos",
    element: <ProtectedRoute element={<ManagePedidos />} allowedRoles={['empleado']} />
  },
  {
    path: "/administrar/pedidos/historial",
    element: <ProtectedRoute element={<PedidosShown />} allowedRoles={['empleado']} />
  },
  {
    path: "/administrar/clientes",
    element: <ProtectedRoute element={<ManageClients />} allowedRoles={['empleado']} />
  },
  {
    path: "/administrar/catalogo/productos",
    element: <ProtectedRoute element={<CatalogoProductos />} allowedRoles={['empleado']} />
  },
  {
    path: "/administrar/productos/",
    element: <ProtectedRoute element={<ManageProductos />} allowedRoles={['empleado']} />
  },
  {
    path: "/administrar/producto/proveedor",
    element: <ProtectedRoute element={<ProveedoresPage />} allowedRoles={['empleado']} />
  },
  {
    path: "/administrar/producto/lotes",
    element: <ProtectedRoute element={<LotesPage />} allowedRoles={['empleado']} />
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
