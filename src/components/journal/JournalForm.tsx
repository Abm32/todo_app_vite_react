import React, { useState } from 'react';
import { Camera, Tag, Smile, Frown, Meh } from 'lucide-react';
import { useJournal } from '../../features/journal/hooks/useJournal';
import { CreateJournalEntryData } from '../../features/journal/types/journalTypes';

interface Props {
  onComplete?: () => void;
}

export const JournalForm: React.FC<Props> = ({ onComplete }) => {
  const { createEntry, loading, error } = useJournal();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<'happy' | 'sad' | 'neutral'>('neutral');
  const [photos, setPhotos] = useState<File[]>([]);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos(prev => [...prev, ...files]);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tag.trim()) {
      e.preventDefault();
      setTags(prev => [...prev, tag.trim()]);
      setTag('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const entryData: CreateJournalEntryData = {
        content,
        mood,
        photos,
        tags,
        isPublic,
      };

      await createEntry(entryData);
      
      setContent('');
      setMood('neutral');
      setPhotos([]);
      setTags([]);
      setIsPublic(false);
      onComplete?.();
    } catch (err) {
      console.error('Error creating journal entry:', err);
    }
  };

  // Rest of the component remains the same...
};