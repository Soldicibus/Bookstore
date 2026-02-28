import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

/**
 * RequireAuth - Protects routes that require authentication
 * Redirects to /auth if user is not authenticated
 */
export default function RequireAuth({ children }) {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Redirect to auth page, but save the location they were trying to access
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  return children;
}
