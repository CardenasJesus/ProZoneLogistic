import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  return localStorage.getItem('access') ? (
    element
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
