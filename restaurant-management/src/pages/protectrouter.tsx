import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectRouterProps {
  children: React.ReactElement;
  isAuthenticated: boolean;
}
const ProtectRouter: React.FC<ProtectRouterProps> = ({
  children,
  isAuthenticated,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectRouter;
