import { supabase } from '../../../config/supabase';
import { AuthError } from '../types/authTypes';

export const authApi = {
  async signUp(email: string, password: string, name: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });

      if (error) throw new AuthError('signup_failed', error.message);
      if (!data.user) throw new AuthError('signup_failed', 'Signup failed');

      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          id: data.user.id,
          email,
          name,
          role: 'user',
          is_profile_complete: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw new AuthError('profile_creation_failed', 'Failed to create user profile');
      }

      return data;
    } catch (error) {
      if (error instanceof AuthError) throw error;
      throw new AuthError('unknown_error', 'An unexpected error occurred');
    }
  },

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw new AuthError('signin_failed', error.message);
      if (!data.user) throw new AuthError('signin_failed', 'Login failed');

      return data;
    } catch (error) {
      if (error instanceof AuthError) throw error;
      throw new AuthError('unknown_error', 'An unexpected error occurred');
    }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new AuthError('signout_failed', error.message);
  }
};