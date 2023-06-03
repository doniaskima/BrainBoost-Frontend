import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/index';

interface Recipient {
  id: string;
  name: string;
  // Add more properties as needed
}

interface Group {
  id: string;
  name: string;
  // Add more properties as needed
}

interface Message {
  id: string;
  content: string;
  // Add more properties as needed
}

interface GetMessagesPayload {
  senderId: string;
  receiverId: string;
}

interface GetGroupMessagesPayload {
  userId: string;
  groupId: string;
}

// Fetch and return all messages for a given sender and receiver
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ senderId, receiverId }: GetMessagesPayload) => {
    const response = await api.getMessages(senderId, receiverId);
    return response.data.messages;
  }
);

// Fetch and return all messages for a given user and group
export const fetchGroupMessages = createAsyncThunk(
  'messages/fetchGroupMessages',
  async ({ userId, groupId }: GetGroupMessagesPayload) => {
    const response = await api.getGroupMessages(userId, groupId);
    return response.data.messages;
  }
);

// Delete a message
export const deleteMessage = createAsyncThunk('messages/deleteMessage', async (messageId: string) => {
  await api.deleteMessage(messageId);
  return messageId;
});

// Define the initial state for the messages slice
const initialState: Message[] = [];

// Create the messages slice
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch messages reducers
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(fetchGroupMessages.fulfilled, (state, action) => {
      return action.payload;
    });

    // Delete message reducer
    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      const messageId = action.payload;
      return state.filter((message) => message.id !== messageId);
    });
  },
});

export const { actions } = messagesSlice; // Add this line to extract actions if needed
export default messagesSlice.reducer;
