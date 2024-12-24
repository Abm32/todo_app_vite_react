export const getAuthErrorMessage = (error: string) => {
  const errorMessages: { [key: string]: string } = {
    'Invalid login credentials': 'Invalid email or password',
    'Email already registered': 'This email is already registered',
    'Password should be at least 8 characters': 'Password must be at least 8 characters long',
    'User already registered': 'An account with this email already exists',
    'Invalid email': 'Please enter a valid email address',
  };

  return errorMessages[error] || 'An unexpected error occurred. Please try again.';
};

export const getJournalErrorMessage = (error: string) => {
  const errorMessages: { [key: string]: string } = {
    'Invalid user': 'You must be logged in to create a journal entry',
    'Content is required': 'Please enter some content for your journal entry',
    'Invalid mood': 'Please select a valid mood',
  };

  return errorMessages[error] || 'Failed to save journal entry. Please try again.';
};