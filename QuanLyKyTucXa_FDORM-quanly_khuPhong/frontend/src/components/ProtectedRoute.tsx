import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Role = "admin" | "staff" | "student";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: Role[];
  fallback?: string;
}

export default function ProtectedRoute({ children, roles, fallback = "/" }: ProtectedRouteProps) {
  const { user, checked } = useAuth();
  const location = useLocation();

  if (!checked) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(user.role as Role)) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}
