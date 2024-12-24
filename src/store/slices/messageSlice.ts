import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/config';
import { MESSAGE_ENDPOINTS } from '../../api/endpoints';
import { Message } from '../../types';

interface MessageState {
  conversations: { [key: string]: Message[] };
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  conversations: {},
  loading: false,
  error: null,
};

export const fetchConversations = createAsyncThunk(
  'message/fetchConversations',
  async () => {
    const response = await api.get(MESSAGE_ENDPOINTS.CONVERSATIONS);
    return response.data;
  }
);

export const fetchMessages = createAsyncThunk(
  'message/fetchMessages',
  async (conversationId: string) => {
    const response = await api.get(MESSAGE_ENDPOINTS.MESSAGES(conversationId));
    return { conversationId, messages: response.data };
  }
);

export const sendMessage = createAsyncThunk(
  'message/sendMessage',
  async ({ conversationId, content }: { conversationId: string; content: string }) => {
    const response = await api.post(MESSAGE_ENDPOINTS.SEND, {
      conversationId,
      content,
    });
    return response.data;
  }
);

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      if (!state.conversations[conversationId]) {
        state.conversations[conversationId] = [];
      }
      state.conversations[conversationId].push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch conversations';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { conversationId, messages } = action.payload;
        state.conversations[conversationId] = messages;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { conversationId } = action.payload;
        if (!state.conversations[conversationId]) {
          state.conversations[conversationId] = [];
        }
        state.conversations[conversationId].push(action.payload);
      });
  },
});

export const { clearError, addMessage } = messageSlice.actions;
export default messageSlice.reducer;