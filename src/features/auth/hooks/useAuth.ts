import { useState } from 'react';
import { authApi } from '../api/authApi';
import { AuthError } from '../types/authTypes';
import { getAuthErrorMessage } from '../utils/errorMessages';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);

      const { user } = await authApi.signUp(email, password, name);
      
      if (!user) {
        throw new AuthError('signup_failed', 'Registration failed. Please try again.');
      }

      await authApi.createUserProfile(user.id, email, name);

      return user;
    } catch (err) {
      console.error('Signup error details:', {
        name: err.name,
        message: err.message,
        code: err instanceof AuthError ? err.code : 'unknown',
        stack: err.stack
      });

      if (err instanceof AuthError) {
        const errorMessage = getAuthErrorMessage(err.code);
        setError(errorMessage);
        throw err;
      }
      
      const genericError = new AuthError(
        'unknown_error',
        'An unexpected error occurred. Please try again.'
      );
      setError(genericError.message);
      throw genericError;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const { user } = await authApi.signIn(email, password);
      return user;
    } catch (err) {
      console.error('Login error details:', {
        name: err.name,
        message: err.message,
        code: err instanceof AuthError ? err.code : 'unknown',
        stack: err.stack
      });

      if (err instanceof AuthError) {
        const errorMessage = getAuthErrorMessage(err.code);
        setError(errorMessage);
        throw err;
      }
      
      const genericError = new AuthError(
        'unknown_error',
        'An unexpected error occurred. Please try again.'
      );
      setError(genericError.message);
      throw genericError;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await authApi.signOut();
    } catch (err) {
      console.error('Logout error details:', {
        name: err.name,
        message: err.message,
        code: err instanceof AuthError ? err.code : 'unknown',
        stack: err.stack
      });

      if (err instanceof AuthError) {
        const errorMessage = getAuthErrorMessage(err.code);
        setError(errorMessage);
        throw err;
      }
      
      const genericError = new AuthError(
        'unknown_error',
        'An unexpected error occurred. Please try again.'
      );
      setError(genericError.message);
      throw genericError;
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    login,
    logout,
    loading,
    error,
  };
};