import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./routes/pages/Home"
import RegisterPage from "./routes/pages/Register"
import Dashboard from "./routes/pages/Dashboard"
import AdminPage from "./routes/pages/adminpage"
import ProtectedRoute from "./routes/private/protectedRoutes"
import NotFound from './routes/pages/404'

function App() {
  useState(() => {})

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/envios" element={<ProtectedRoute element={<AdminPage />} />} />
          <Route path="*" element={<NotFound />}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
