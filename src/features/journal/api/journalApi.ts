import { supabase } from '../../../config/supabase';
import { JournalError } from '../types/journalTypes';
import { uploadPhotos } from '../utils/photoUpload';

export const journalApi = {
  async createEntry(userId: string, data: CreateJournalEntryData) {
    try {
      let photoUrls: string[] = [];
      
      if (data.photos?.length) {
        photoUrls = await uploadPhotos(userId, data.photos);
      }

      const { data: entry, error } = await supabase
        .from('journal_entries')
        .insert([{
          user_id: userId,
          content: data.content,
          mood: data.mood,
          photos: photoUrls,
          tags: data.tags,
          is_public: data.isPublic,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Journal entry creation error:', {
          code: error.code,
          message: error.message,
          details: error
        });
        throw new JournalError('entry_creation_failed', 'Failed to create journal entry');
      }

      return entry;
    } catch (err) {
      if (err instanceof JournalError) {
        throw err;
      }
      console.error('Unexpected journal error:', err);
      throw new JournalError('unknown_error', 'An unexpected error occurred');
    }
  }
};