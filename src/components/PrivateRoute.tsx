import React from 'react';
import { Route, useNavigate } from 'react-router';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  component: React.ComponentType<any>;
  redirectTo: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  component: Component,
  redirectTo,
  ...rest
}) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
