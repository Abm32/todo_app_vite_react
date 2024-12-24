import { useState } from 'react';
import { profileApi } from '../api/profileApi';
import { ProfileError, PROFILE_ERROR_CODES } from '../types/profileTypes';
import { validateProfileData } from '../utils/validation';
import { getProfileErrorMessage } from '../utils/errorMessages';
import { UserProfile } from '../../../types';
import { useAuth } from '../../auth/hooks/useAuth';

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    try {
      setLoading(true);
      setError(null);

      if (!currentUser?.id) {
        throw new ProfileError(
          PROFILE_ERROR_CODES.AUTH_REQUIRED,
          'Authentication required'
        );
      }

      if (!validateProfileData(profileData)) {
        throw new ProfileError(
          PROFILE_ERROR_CODES.INVALID_DATA,
          'Invalid profile data'
        );
      }

      return await profileApi.updateProfile(currentUser.id, profileData);
    } catch (err) {
      const message = err instanceof ProfileError 
        ? getProfileErrorMessage(err.code)
        : 'Failed to update profile';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    loading,
    error
  };
};