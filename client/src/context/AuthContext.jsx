import React, { createContext, useCallback } from "react";
import { useAuth } from "../hooks/users/useAuth";

export const AuthContext = createContext(null);

/**
 * AuthProvider - Provides auth state to the entire application
 */
export function AuthProvider({ children }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context
 */
export function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
