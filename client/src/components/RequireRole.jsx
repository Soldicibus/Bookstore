import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

export default function RequireRole({ allowedRoles = [], children }) {
  const location = useLocation();
  const currentUser = getCurrentUser();
  const userId = currentUser?.userId || currentUser?.id || currentUser?.sub || null;
  const tokenRole = currentUser?.role || currentUser?.role_name || null;

  if (!userId || !tokenRole) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  const normalizedRoles = [];
  if (tokenRole) normalizedRoles.push(String(tokenRole));

  // Normalize casing, may return 'Student' while routes use 'student'.
  const userRoles = Array.from(
    new Set(normalizedRoles.filter(Boolean).map(r => r.toLowerCase())),
  );
  const allowedRolesNorm = allowedRoles.map(r => String(r).toLowerCase());

  const allowed = allowedRolesNorm.length === 0 || allowedRolesNorm.some(r => userRoles.includes(r));
  if (!allowed) {
    if (import.meta.env?.VITE_API_DEV === 'true') {
      console.warn(`RequireRole: user roles [${userRoles.join(', ')}] do not include any of allowed roles [${allowedRolesNorm.join(', ')}]`);
    }
    return <Navigate to="/" replace />;
  }

  return children;
}
