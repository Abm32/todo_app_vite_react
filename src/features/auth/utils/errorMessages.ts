const AUTH_ERROR_MESSAGES: Record<string, string> = {
  signup_failed: 'Failed to create account. Please try again.',
  profile_creation_failed: 'Failed to create user profile. Please try again.',
  signin_failed: 'Invalid email or password.',
  signout_failed: 'Failed to sign out. Please try again.',
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password should be at least 8 characters.',
  unknown_error: 'An unexpected error occurred. Please try again.',
  // Add Supabase specific error codes
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Invalid password.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
};

export const getAuthErrorMessage = (code: string): string => {
  return AUTH_ERROR_MESSAGES[code] || 'An unexpected error occurred. Please try again.';
};