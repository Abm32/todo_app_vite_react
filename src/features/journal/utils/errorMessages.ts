const JOURNAL_ERROR_MESSAGES: Record<string, string> = {
  entry_creation_failed: 'Failed to create journal entry. Please try again.',
  photo_upload_failed: 'Failed to upload photos. Please try again.',
  auth_required: 'You must be logged in to create a journal entry.',
  invalid_content: 'Please enter some content for your journal entry.',
  invalid_mood: 'Please select a valid mood.',
  unknown_error: 'An unexpected error occurred. Please try again.',
};

export const getJournalErrorMessage = (code: string): string => {
  return JOURNAL_ERROR_MESSAGES[code] || 'An unexpected error occurred. Please try again.';
};