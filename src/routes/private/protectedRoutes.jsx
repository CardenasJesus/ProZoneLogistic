import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('access');
  
  if (!token) {
    // Si no hay token, redirige al usuario a la página de inicio
    return <Navigate to="/" />;
  }

  // Verifica si el usuario tiene un rol permitido
  if (allowedRoles) {
    const userRole = user?.empleado ? 'empleado' : (user?.conductor ? 'conductor' : null);

    if (!allowedRoles.includes(userRole)) {
      // Si el rol del usuario no está en los roles permitidos, redirige a la página de inicio
      return <Navigate to="/" />;
    }
  }

  // Si el token y el rol del usuario son válidos, permite el acceso
  return element;
};

export default ProtectedRoute;
