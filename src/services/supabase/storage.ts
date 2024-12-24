import { supabase } from '../../config/supabase';

export const supabaseStorage = {
  uploadFile: async (file: File, bucket: string, path: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  uploadProfilePhoto: async (userId: string, file: File) => {
    return await supabaseStorage.uploadFile(file, 'profiles', `${userId}`);
  },

  uploadJournalPhoto: async (userId: string, file: File) => {
    return await supabaseStorage.uploadFile(file, 'journals', `${userId}`);
  },

  uploadFamilyPhoto: async (familyId: string, file: File) => {
    return await supabaseStorage.uploadFile(file, 'families', `${familyId}`);
  }
};