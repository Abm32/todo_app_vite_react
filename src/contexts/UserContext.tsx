import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../types';

interface UserContextType {
  userProfile: UserProfile | null;
  updateProfile: (profile: UserProfile) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const updateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  return (
    <UserContext.Provider value={{ userProfile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};