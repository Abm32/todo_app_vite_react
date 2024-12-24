export class ProfileError extends Error {
  constructor(
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'ProfileError';
  }
}

export const PROFILE_ERROR_CODES = {
  FETCH_FAILED: 'fetch_failed',
  UPDATE_FAILED: 'update_failed',
  AUTH_REQUIRED: 'auth_required',
  INVALID_DATA: 'invalid_data',
} as const;

export const PROFILE_ERROR_MESSAGES: Record<string, string> = {
  [PROFILE_ERROR_CODES.FETCH_FAILED]: 'Failed to fetch profile',
  [PROFILE_ERROR_CODES.UPDATE_FAILED]: 'Failed to update profile',
  [PROFILE_ERROR_CODES.AUTH_REQUIRED]: 'Authentication required',
  [PROFILE_ERROR_CODES.INVALID_DATA]: 'Invalid profile data',
};