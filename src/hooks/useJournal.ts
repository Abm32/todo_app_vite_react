import { useState } from 'react';
import { supabase } from '../config/supabase';
import { JournalEntry } from '../types';

export const useJournal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEntry = async (entry: Partial<JournalEntry>) => {
    try {
      setLoading(true);
      setError(null);

      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('User not authenticated');

      const { data, error: insertError } = await supabase
        .from('journal_entries')
        .insert([
          {
            user_id: user.data.user.id,
            date: new Date().toISOString(),
            content: entry.content,
            mood: entry.mood,
            photos: entry.photos || [],
            tags: entry.tags || [],
            is_public: entry.isPublic || false,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createEntry,
    loading,
    error,
  };
};