import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../features/auth/api/authApi';
import { profileApi } from '../features/profile/api/profileApi';
import { UserProfile } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await authApi.getSession();
    if (session) {
      setIsAuthenticated(true);
      setCurrentUser(session.user as any);
      await fetchUserProfile(session.user.id);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      const profile = await profileApi.getProfile(userId);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    const { user } = await authApi.signUp(email, password, name);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user as any);
      await fetchUserProfile(user.id);
    }
  };

  const login = async (email: string, password: string) => {
    const { user } = await authApi.signIn(email, password);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user as any);
      await fetchUserProfile(user.id);
    }
  };

  const logout = async () => {
    await authApi.signOut();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      currentUser,
      userProfile,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};