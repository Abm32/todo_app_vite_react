import { UserProfile } from '../../../types';

export const validateProfileData = (profile: Partial<UserProfile>): boolean => {
  if (profile.name && profile.name.trim().length < 2) {
    return false;
  }

  if (profile.dateOfBirth) {
    const date = new Date(profile.dateOfBirth);
    if (isNaN(date.getTime())) {
      return false;
    }
  }

  return true;
};