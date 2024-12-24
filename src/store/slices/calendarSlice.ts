import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/config';
import { CALENDAR_ENDPOINTS } from '../../api/endpoints';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'birthday' | 'anniversary' | 'event';
  familyId: string;
}

interface CalendarState {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
}

const initialState: CalendarState = {
  events: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk('calendar/fetchEvents', async () => {
  const response = await api.get(CALENDAR_ENDPOINTS.EVENTS);
  return response.data;
});

export const createEvent = createAsyncThunk(
  'calendar/createEvent',
  async (event: Partial<CalendarEvent>) => {
    const response = await api.post(CALENDAR_ENDPOINTS.EVENTS, event);
    return response.data;
  }
);

export const updateEvent = createAsyncThunk(
  'calendar/updateEvent',
  async ({ id, event }: { id: string; event: Partial<CalendarEvent> }) => {
    const response = await api.put(CALENDAR_ENDPOINTS.EVENT(id), event);
    return response.data;
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      });
  },
});

export const { clearError } = calendarSlice.actions;
export default calendarSlice.reducer;