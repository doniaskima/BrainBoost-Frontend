import { createAsyncThunk, createSlice, Draft } from '@reduxjs/toolkit';
import { deleteUser, getUserById, getSavedMessages, deleteSavedMessage, getRecipients, getGroups, updateUser } from '../../api/index';

interface Group {
  id: string;
  adminId: string;
  groupName: string;
  isPublic: boolean;
  description: string;
}

interface Recipient {
  id: string;
  name: string;
  email: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  recipients: Recipient[];
  groups: Group[];
}

// type WritableDraft<T> = {
//   -readonly [K in keyof T]: Draft<T[K]>;
// };

interface UserState {
  user: User | null;
  loading: 'idle' | 'pending';
  error: string | null;
  recipients: Recipient[];
}

export type Credentials = {
  username: string;
  password: string;
  email: string;
};

// Async Thunks

// PUT /users/update/:userId - Update details of user (except id).
export const updateUserDetails = createAsyncThunk(
  'user/updateUserDetails',
  async ({ userId, userData }: { userId: string; userData: Partial<User> }) => {
    await updateUser(userId, userData);
    return { userId, userData };
  }
);

// DELETE /users/:userId - delete user.
export const deleteUserById = createAsyncThunk('user/deleteUser', async (userId: string) => {
  await deleteUser(userId);
  return userId;
});

// GET /users/get_by_Id/:userId - fetch single user by id.
export const fetchUserById = createAsyncThunk('user/fetchUserById', async (userId: string) => {
  const response = await getUserById(userId);
  return response.data.user;
});

// GET /users/savedMessages/:userId - fetch saved messages.
export const fetchSavedMessages = createAsyncThunk('user/fetchSavedMessages', async (userId: string) => {
  const response = await getSavedMessages(userId);
  return response.data.messages;
});

// GET /users/recipients/:userId - fetch Recipients by userId
export const fetchRecipientsByUserId = createAsyncThunk(
  'user/fetchRecipientsByUserId',
  async (userId: string) => {
    const response = await getRecipients(userId);
    return response.data.recipients;
  }
);

// DELETE /users/delete_saved_message - take userId and messageId to delete it from Saved Messages.
export const deleteSavedMessageById = createAsyncThunk(
  'user/deleteSavedMessage',
  async ({ userId, messageId }: { userId: string; messageId: string }) => {
    await deleteSavedMessage(userId, messageId);
    return { userId, messageId };
  }
);

// GET /users/groups/:userId - fetch Groups By userId.
export const fetchGroupsByUserId = createAsyncThunk('user/fetchGroupsByUserId', async (userId: string) => {
  const response = await getGroups(userId);
  return response.data.groups;
});

// PUT /users/update/:userId - update User Details.
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ userId, userData }: { userId: string; userData: Partial<User> }) => {
    await updateUser(userId, userData);
    return { userId, userData };
  }
);

// DELETE /users/:userId - delete User
export const deleteUserProfile = createAsyncThunk('user/deleteUserProfile', async (userId: string) => {
  await deleteUserById(userId);
  return userId;
});

// Slice

const initialState: UserState = {
  user: null,
  loading: 'idle',
  error: null,
  recipients: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update User Details
    builder.addCase(updateUserDetails.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      const { userId, userData } = action.payload;
      if (state.user && state.user.id === userId) {
        Object.assign(state.user, userData);
      }
      state.loading = 'idle';
    });

    builder.addCase(updateUserDetails.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error.message ?? 'An error occurred';
    });

    // Delete User
    builder.addCase(deleteUserById.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });

    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      const deletedUserId = action.payload;
      if (state.user && state.user.id === deletedUserId) {
        state.user = null;
      }
      state.loading = 'idle';
    });

    builder.addCase(deleteUserById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error.message ?? 'An error occurred';
    });

    // Fetch User By Id
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });

    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // state.user = action.payload;
      state.loading = 'idle';
    });

    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error.message ?? 'An error occurred';
    });

    // Fetch Saved Messages
    builder.addCase(fetchSavedMessages.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(fetchSavedMessages.fulfilled, (state, action) => {
      // Handle the fetched messages as needed
      state.loading = 'idle';
    });
    builder.addCase(fetchSavedMessages.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error.message ?? 'An error occurred';
    });

    // Delete Saved Message
    builder.addCase(deleteSavedMessageById.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(deleteSavedMessageById.fulfilled, (state, action) => {
      // Handle the deleted message as needed
      state.loading = 'idle';
    });
    builder.addCase(deleteSavedMessageById.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error.message ?? 'An error occurred';
    });

    // Fetch Recipients By User Id
    builder.addCase(fetchRecipientsByUserId.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(fetchRecipientsByUserId.fulfilled, (state, action) => {
      // Handle the fetched recipients as needed
      state.loading = 'idle';
    });
    builder.addCase(fetchRecipientsByUserId.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error.message ?? 'An error occurred';
    });

    // Fetch Groups By User Id
    builder.addCase(fetchGroupsByUserId.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(fetchGroupsByUserId.fulfilled, (state, action) => {
      // Handle the fetched groups as needed
      state.loading = 'idle';
    });
    builder.addCase(fetchGroupsByUserId.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error.message ?? 'An error occurred';
    });

    // Update User Profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      const { userId, userData } = action.payload;
      if (state.user && state.user.id === userId) {
        Object.assign(state.user, userData);
      }
      state.loading = 'idle';
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error.message ?? 'An error occurred';
    });

    // Delete User Profile
    builder.addCase(deleteUserProfile.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(deleteUserProfile.fulfilled, (state, action) => {
      const deletedUserId = action.payload;
      if (state.user && state.user.id === deletedUserId) {
        state.user = null;
      }
      state.loading = 'idle';
    });
    builder.addCase(deleteUserProfile.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error.message ?? 'An error occurred';
    });
  },
});

export default userSlice.reducer;
