export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  mood: 'happy' | 'sad' | 'neutral';
  photos: string[];
  tags: string[];
  isPublic: boolean;
  createdAt: string;
}

export class JournalError extends Error {
  constructor(
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'JournalError';
  }
}

export interface CreateJournalEntryData {
  content: string;
  mood: 'happy' | 'sad' | 'neutral';
  photos?: File[];
  tags: string[];
  isPublic: boolean;
}