import React from 'react';
import { useAuth } from '../../hooks/users';

/**
 * Example component showing how to use the useAuth hook
 * This demonstrates all available auth features
 */
export default function AuthExample() {
  const {
    user,
    isAuthenticated,
    currentUser,
    isLoading,
    login,
    isLoggingIn,
    loginError,
    register,
    isRegistering,
    registerError,
    logout,
    isLoggingOut,
  } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Authentication Example</h2>

      {/* Auth Status */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>Auth Status</h3>
        <p>Authenticated: {isAuthenticated ? '✓ Yes' : '✗ No'}</p>
        {isLoading && <p>Loading user data...</p>}
        {isAuthenticated && user && (
          <>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Roles: {currentUser?.roles?.join(', ')}</p>
          </>
        )}
      </section>

      {/* Login Example */}
      {!isAuthenticated && (
        <section style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h3>Login Example</h3>
          <button
            onClick={async () => {
              try {
                await login({
                  username: 'testuser',
                  password: 'password123',
                });
              } catch (error) {
                console.error('Login failed:', error);
              }
            }}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? 'Logging in...' : 'Test Login'}
          </button>
          {loginError && <p style={{ color: 'red' }}>Error: {loginError.message}</p>}
        </section>
      )}

      {/* Register Example */}
      {!isAuthenticated && (
        <section style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h3>Register Example</h3>
          <button
            onClick={async () => {
              try {
                await register({
                  username: 'newuser',
                  email: 'newuser@example.com',
                  password: 'password123',
                });
              } catch (error) {
                console.error('Registration failed:', error);
              }
            }}
            disabled={isRegistering}
          >
            {isRegistering ? 'Registering...' : 'Test Register'}
          </button>
          {registerError && <p style={{ color: 'red' }}>Error: {registerError.message}</p>}
        </section>
      )}

      {/* Logout Example */}
      {isAuthenticated && (
        <section style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h3>Logout Example</h3>
          <button
            onClick={() => logout()}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </section>
      )}
    </div>
  );
}
