import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Family, FamilyMember } from '../types';

interface FamilyContextType {
  families: Family[];
  currentFamily: Family | null;
  familyMembers: FamilyMember[];
  createFamily: (familyData: Partial<Family>) => Promise<void>;
  joinFamily: (familyId: string) => Promise<void>;
  leaveFamily: () => Promise<void>;
  getFamilyMembers: (familyId: string) => Promise<void>;
}

const FamilyContext = createContext<FamilyContextType | null>(null);

export const FamilyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [families, setFamilies] = useState<Family[]>([]);
  const [currentFamily, setCurrentFamily] = useState<Family | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  // Mock data - replace with actual API calls
  const createFamily = async (familyData: Partial<Family>) => {
    const newFamily: Family = {
      id: Date.now().toString(),
      name: familyData.name || '',
      description: familyData.description || '',
      createdBy: familyData.createdBy || '',
      createdAt: new Date().toISOString(),
      coverPhoto: familyData.coverPhoto || '',
      memberCount: 1,
    };
    setFamilies([...families, newFamily]);
    setCurrentFamily(newFamily);
  };

  const joinFamily = async (familyId: string) => {
    const family = families.find(f => f.id === familyId);
    if (family) {
      setCurrentFamily(family);
    }
  };

  const leaveFamily = async () => {
    setCurrentFamily(null);
  };

  const getFamilyMembers = async (familyId: string) => {
    // Mock data - replace with actual API call
    const mockMembers: FamilyMember[] = [
      {
        userId: '1',
        familyId,
        joinedAt: new Date().toISOString(),
        role: 'admin',
        name: 'John Doe',
        profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      },
    ];
    setFamilyMembers(mockMembers);
  };

  return (
    <FamilyContext.Provider
      value={{
        families,
        currentFamily,
        familyMembers,
        createFamily,
        joinFamily,
        leaveFamily,
        getFamilyMembers,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamily = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamily must be used within a FamilyProvider');
  }
  return context;
};