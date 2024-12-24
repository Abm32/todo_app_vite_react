import { PROFILE_ERROR_MESSAGES } from '../types/profileTypes';

export const getProfileErrorMessage = (code: string): string => {
  return PROFILE_ERROR_MESSAGES[code] || 'An unexpected error occurred';
};