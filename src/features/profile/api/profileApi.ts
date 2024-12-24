import { supabase } from '../../../config/supabase';
import { ProfileError } from '../types/profileTypes';
import { UserProfile } from '../../../types';

export const profileApi = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw new ProfileError('fetch_failed', error.message);
    return data;
  },

  async updateProfile(userId: string, profile: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('users')
      .update({
        name: profile.name,
        date_of_birth: profile.dateOfBirth,
        bio: profile.bio,
        profile_photo: profile.profilePhoto,
        is_profile_complete: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new ProfileError('update_failed', error.message);
    return data;
  }
};