import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/index';

interface Group {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  members: Member[];
}

interface Member {
  id: string;
  name: string;
  // Add more properties as needed
}

interface FetchGroupMembersPayload {
  groupId: string;
}

interface CreateGroupPayload {
  adminId: string;
  groupName: string;
  isPublic: boolean;
  description: string;
}

interface UpdateGroupPayload {
  groupId: string;
  name: string;
  description: string;
  isPublic: boolean;
}

interface RemoveMemberPayload {
  memberId: string;
  groupId: string;
}

interface AddMemberPayload {
    memberId: string;
    groupId: string;
  }

  export const addMemberToGroup = createAsyncThunk(
    'groups/addMemberToGroup',
    async ({ memberId, groupId }: AddMemberPayload) => {
      await api.addMemberToGroup(memberId, groupId);
      return { memberId, groupId };
    }
  );
  

// Fetch and return group members
export const fetchGroupMembers = createAsyncThunk(
  'groups/fetchGroupMembers',
  async ({ groupId }: FetchGroupMembersPayload) => {
    const response = await api.fetchGroupMembers(groupId);
    return { groupId, members: response.data.members };
  }
);

// Create a new group
export const createGroup = createAsyncThunk(
  'groups/createGroup',
  async ({ adminId, groupName, isPublic, description }: CreateGroupPayload) => {
    const response = await api.createGroup(adminId, groupName, isPublic, description);
    return response.data.group;
  }
);

// Update group information
export const updateGroup = createAsyncThunk(
  'groups/updateGroup',
  async ({ groupId, name, description, isPublic }: UpdateGroupPayload) => {
    await api.updateGroup(groupId, name, description, isPublic);
    return { groupId, name, description, isPublic };
  }
);

// Remove a member from a group
export const removeMemberFromGroup = createAsyncThunk(
  'groups/removeMemberFromGroup',
  async ({ memberId, groupId }: RemoveMemberPayload) => {
    await api.removeMemberFromGroup(memberId, groupId);
    return { memberId, groupId };
  }
);

// Delete a group
export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async (groupId: string) => {
    await api.deleteGroup(groupId);
    return groupId;
  }
);

// Define the initial state for the groups slice
const initialState: Group[] = [];

// Create the groups slice
const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch group members reducer
    // builder.addCase(fetchGroupMembers.fulfilled, (state, action) => {
    //   const { groupId, members } = action.payload;
    //   const groupIndex = state.findIndex((group) => group.id === groupId);

    //   if (groupIndex !== -1) {
    //     state[groupIndex].members = members;
    //   }
    // });

    // Create group reducer
    // builder.addCase(createGroup.fulfilled, (state, action) => {
    //   state.push(action.payload);
    // });

    // Update group reducer
    builder.addCase(updateGroup.fulfilled, (state, action) => {
      const { groupId, name, description, isPublic } = action.payload;
      const group = state.find((group) => group.id === groupId);
      if (group) {
        group.name = name;
        group.description = description;
        group.isPublic = isPublic;
      }
    });

    // Remove member from group reducer
    builder.addCase(removeMemberFromGroup.fulfilled, (state, action) => {
      const { memberId, groupId } = action.payload;
      const group = state.find((group) => group.id === groupId);
      if (group) {
        group.members = group.members.filter((member) => member.id !== memberId);
      }
    });

    // Delete group reducer
    builder.addCase(deleteGroup.fulfilled, (state, action) => {
      const groupId = action.payload;
      return state.filter((group) => group.id !== groupId);
    });

    builder.addCase(addMemberToGroup.fulfilled, (state, action) => {
        const { memberId, groupId } = action.payload;
        const group = state.find((group) => group.id === groupId);
        if (group) {
          const newMember: Member = {
            id: memberId,
            name: '', // Add the name of the new member here
            // Add more properties as needed
          };
          group.members.push(newMember);
        }
      });
      
  },
});

export default groupSlice.reducer;
