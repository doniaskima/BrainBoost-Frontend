import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  path: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, path, ...rest }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user == null) {
    navigate("/");
    return null;
  }

  return <Component {...rest} />;
};
