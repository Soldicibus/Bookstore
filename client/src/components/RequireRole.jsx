import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

/**
 * RequireRole - Protects routes that require specific roles
 * @param {Array<string>} allowedRoles - Array of role names that are allowed to access this route
 * @param {React.ReactNode} children - The component to render if authorized
 */
export default function RequireRole({ allowedRoles = [], children }) {
  const location = useLocation();
  const currentUser = getCurrentUser();
  const userId = currentUser?.userId || currentUser?.id || currentUser?.sub || null;
  
  // Get roles from token (could be single role or array)
  let userRoles = [];
  if (currentUser?.roles && Array.isArray(currentUser.roles)) {
    userRoles = currentUser.roles.map(r => String(r).toLowerCase());
  } else if (currentUser?.role) {
    userRoles = [String(currentUser.role).toLowerCase()];
  }

  // If no user ID or no roles, redirect to auth
  if (!userId || userRoles.length === 0) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Normalize allowed roles for comparison
  const allowedRolesNorm = allowedRoles.map(r => String(r).toLowerCase());

  // If no restrictions specified or user has at least one allowed role, allow access
  const allowed = allowedRolesNorm.length === 0 || allowedRolesNorm.some(r => userRoles.includes(r));
  
  if (!allowed) {
    if (import.meta.env?.VITE_API_DEV === 'true') {
      console.warn(
        `RequireRole: user roles [${userRoles.join(', ')}] do not include any of allowed roles [${allowedRolesNorm.join(', ')}]`
      );
    }
    return <Navigate to="/" replace />;
  }

  return children;
}
