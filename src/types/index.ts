export interface UserProfile {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  bio: string;
  profilePhoto: string;
  role: 'admin' | 'user';
  isProfileComplete: boolean;
  familyId?: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  content: string;
  mood: 'happy' | 'sad' | 'neutral';
  photos: string[];
  tags: string[];
  createdAt: string;
  isPublic: boolean;
}

export interface Family {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  coverPhoto: string;
  memberCount: number;
  treeData?: FamilyTreeData;
}

export interface FamilyMember {
  userId: string;
  familyId: string;
  joinedAt: string;
  role: 'admin' | 'member';
  name: string;
  profilePhoto: string;
  parentId?: string;
  generation?: number;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'video';
  status: 'sent' | 'delivered' | 'read';
}

export interface FamilyTreeData {
  nodes: FamilyTreeNode[];
  edges: FamilyTreeEdge[];
}

export interface FamilyTreeNode {
  id: string;
  parentId?: string;
  data: {
    member: FamilyMember;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface FamilyTreeEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}