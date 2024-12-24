import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabaseDB } from '../../services/supabase/database';
import { supabaseStorage } from '../../services/supabase/storage';
import { JournalEntry } from '../../types';

interface JournalState {
  entries: JournalEntry[];
  publicEntries: JournalEntry[];
  currentEntry: JournalEntry | null;
  loading: boolean;
  error: string | null;
}

const initialState: JournalState = {
  entries: [],
  publicEntries: [],
  currentEntry: null,
  loading: false,
  error: null,
};

export const fetchEntries = createAsyncThunk(
  'journal/fetchEntries',
  async (userId: string) => {
    return await supabaseDB.getJournalEntries(userId);
  }
);

export const createEntry = createAsyncThunk(
  'journal/createEntry',
  async ({ entry, photos }: { entry: Partial<JournalEntry>; photos?: File[] }) => {
    let photoUrls: string[] = [];
    
    if (photos?.length) {
      photoUrls = await Promise.all(
        photos.map(photo => supabaseStorage.uploadJournalPhoto(entry.userId!, photo))
      );
    }
    
    return await supabaseDB.createJournalEntry({
      ...entry,
      photos: photoUrls
    });
  }
);

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentEntry: (state, action) => {
      state.currentEntry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch entries';
      })
      .addCase(createEntry.fulfilled, (state, action) => {
        state.entries.unshift(action.payload);
      });
  },
});

export const { clearError, setCurrentEntry } = journalSlice.actions;
export default journalSlice.reducer;