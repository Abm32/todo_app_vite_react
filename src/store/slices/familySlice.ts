import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabaseDB } from '../../services/supabase/database';
import { supabaseStorage } from '../../services/supabase/storage';
import { Family, FamilyMember } from '../../types';

interface FamilyState {
  families: Family[];
  currentFamily: Family | null;
  familyMembers: FamilyMember[];
  loading: boolean;
  error: string | null;
}

const initialState: FamilyState = {
  families: [],
  currentFamily: null,
  familyMembers: [],
  loading: false,
  error: null,
};

export const fetchFamilies = createAsyncThunk(
  'family/fetchFamilies',
  async () => {
    return await supabaseDB.getFamilies();
  }
);

export const createFamily = createAsyncThunk(
  'family/createFamily',
  async ({ family, coverPhoto }: { family: Partial<Family>; coverPhoto?: File }) => {
    let photoUrl = '';
    
    if (coverPhoto) {
      photoUrl = await supabaseStorage.uploadFamilyPhoto(family.id!, coverPhoto);
    }
    
    return await supabaseDB.createFamily({
      ...family,
      coverPhoto: photoUrl
    });
  }
);

export const fetchFamilyMembers = createAsyncThunk(
  'family/fetchFamilyMembers',
  async (familyId: string) => {
    return await supabaseDB.getFamilyMembers(familyId);
  }
);

const familySlice = createSlice({
  name: 'family',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentFamily: (state, action) => {
      state.currentFamily = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamilies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFamilies.fulfilled, (state, action) => {
        state.loading = false;
        state.families = action.payload;
      })
      .addCase(fetchFamilies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch families';
      })
      .addCase(createFamily.fulfilled, (state, action) => {
        state.families.unshift(action.payload);
        state.currentFamily = action.payload;
      })
      .addCase(fetchFamilyMembers.fulfilled, (state, action) => {
        state.familyMembers = action.payload;
      });
  },
});

export const { clearError, setCurrentFamily } = familySlice.actions;
export default familySlice.reducer;