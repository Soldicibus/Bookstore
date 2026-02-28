import { useMe } from "./queries/useMe";
import { useLogin } from "./mutations/useLogin";
import { useLogout } from "./mutations/useLogout";
import { useRegister } from "./mutations/useRegister";
import { isAuthenticated } from "../../utils/auth";
import { getCurrentUser } from "../../utils/auth";

/**
 * Comprehensive auth hook that provides access to all auth-related data and functions
 */
export function useAuth() {
  const me = useMe();
  const login = useLogin();
  const logoutMutation = useLogout();
  const register = useRegister();
  const isAuth = isAuthenticated();
  const currentUser = getCurrentUser();

  return {
    // User data
    user: me.data,
    isLoading: me.isLoading,
    isAuthenticated: isAuth,
    currentUser,
    
    // Login mutation
    login: login.mutateAsync,
    isLoggingIn: login.isPending,
    loginError: login.error,
    
    // Register mutation
    register: register.mutateAsync,
    isRegistering: register.isPending,
    registerError: register.error,
    
    // Logout mutation
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
    logoutError: logoutMutation.error,
    
    // Combined loading state
    isLoadingAuth: me.isLoading || login.isPending || register.isPending,
  };
}
