import React, { ReactNode } from "react";
import Header from "../components/Header.tsx";
import "./AuthLayout.css";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-header">
        <Header />
      </div>
      <main className="auth-main">{children}</main>
    </div>
  );
};

export default AuthLayout;
