import { useState } from 'react';
import { journalApi } from '../api/journalApi';
import { JournalError } from '../types/journalTypes';
import { getJournalErrorMessage } from '../utils/errorMessages';
import { useAuth } from '../../auth/hooks/useAuth';

export const useJournal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  const createEntry = async (data: CreateJournalEntryData) => {
    try {
      setLoading(true);
      setError(null);

      if (!currentUser?.id) {
        throw new JournalError('auth_required', 'You must be logged in to create a journal entry');
      }

      const entry = await journalApi.createEntry(currentUser.id, data);
      return entry;
    } catch (err) {
      console.error('Journal entry creation error:', {
        name: err.name,
        message: err.message,
        code: err instanceof JournalError ? err.code : 'unknown',
        stack: err.stack
      });

      if (err instanceof JournalError) {
        const errorMessage = getJournalErrorMessage(err.code);
        setError(errorMessage);
        throw err;
      }

      const genericError = new JournalError(
        'unknown_error',
        'An unexpected error occurred. Please try again.'
      );
      setError(genericError.message);
      throw genericError;
    } finally {
      setLoading(false);
    }
  };

  return {
    createEntry,
    loading,
    error,
  };
};