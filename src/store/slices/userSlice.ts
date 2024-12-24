import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/config';
import { USER_ENDPOINTS } from '../../api/endpoints';
import { UserProfile } from '../../types';

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk('user/fetchProfile', async () => {
  const response = await api.get(USER_ENDPOINTS.PROFILE);
  return response.data;
});

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: Partial<UserProfile>) => {
    const response = await api.put(USER_ENDPOINTS.UPDATE_PROFILE, profileData);
    return response.data;
  }
);

export const uploadProfilePhoto = createAsyncThunk(
  'user/uploadProfilePhoto',
  async (file: File) => {
    const formData = new FormData();
    formData.append('photo', file);
    const response = await api.post(USER_ENDPOINTS.UPLOAD_PHOTO, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.profilePhoto = action.payload.photoUrl;
        }
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;