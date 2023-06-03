import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Recipient {
  _id: string;
  name:string;
  email:string;
}

const recipientsSlice = createSlice({
  name: 'recipients',
  initialState: [] as Recipient[],
  reducers: {
    addRecipient: (state, action: PayloadAction<Recipient>) => {
      const { payload } = action;
      if (state.findIndex((r) => r._id === payload.sender._id) === -1) {
        state.push(payload);
      }
    },
    removeRecipient: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      return state.filter((obj) => obj._id !== payload);
    },
    addGroup: (state, action: PayloadAction<Recipient>) => {
      const { payload } = action;
      state.push(payload);
    },
  },
});

export const { addRecipient, removeRecipient, addGroup } = recipientsSlice.actions;
export default recipientsSlice.reducer;
