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
    path: "/administrar/envios",
    element: <ProtectedRoute element={<AdminPage />} />
  },
  {
    path: "/administrar/envios/conductores",
    element: <ProtectedRoute element={<ManageConductores />}/>
  },
  {
    path: "/administrar/envios/vehiculos",
    element: <ProtectedRoute element={<VehiculosPage />}/>
  },
  {
    path: "/administrar/envios/rutas",
    element: <ProtectedRoute element={<RutasPage />}/>
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
    path: "/administrar/clientes",
    element: <ProtectedRoute element={<ManageClients />}/>
  },
  {
    path: "/administrar/catalogo/productos",
    element: <ProtectedRoute element={<CatalogoProductos />}/>
  },
  {
    path: "/administrar/productos/",
    element: <ProtectedRoute element={<ManageProductos />}/>
  },
  {
    path: "/administrar/producto/proveedor",
    element: <ProtectedRoute element={<ProveedoresPage />}/>
  },
  {
    path: "/administrar/producto/lotes",
    element: <ProtectedRoute element={<LotesPage />}/>
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
