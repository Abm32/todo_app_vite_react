import { supabase } from '../../../config/supabase';
import { JournalError } from '../types/journalTypes';

export const uploadPhotos = async (userId: string, photos: File[]): Promise<string[]> => {
  try {
    const uploadPromises = photos.map(async (photo) => {
      const fileExt = photo.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('journal_photos')
        .upload(filePath, photo);

      if (uploadError) {
        console.error('Photo upload error:', {
          code: uploadError.message,
          details: uploadError
        });
        throw new JournalError('photo_upload_failed', 'Failed to upload photo');
      }

      const { data: { publicUrl } } = supabase.storage
        .from('journal_photos')
        .getPublicUrl(filePath);

      return publicUrl;
    });

    return await Promise.all(uploadPromises);
  } catch (err) {
    console.error('Photo upload error:', {
      name: err.name,
      message: err.message,
      code: err instanceof JournalError ? err.code : 'unknown'
    });
    throw new JournalError('photo_upload_failed', 'Failed to upload photos');
  }
};