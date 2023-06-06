import http from '../services/httpService';
import { Group, GroupMember } from '../store/actions/group';

const groupAPI = {
  getGroupMembers: async (groupId: string): Promise<GroupMember[]> => {
    try {
      const response = await http.get<GroupMember[]>(`/groups/members/${groupId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createGroup: async (adminId: string, groupName: string, isPublic: boolean, description: string): Promise<Group> => {
    try {
      const response = await http.post<Group>('/groups/create', { adminId, groupName, isPublic, description });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addMember: async (email: string, groupId: string): Promise<GroupMember> => {
    try {
      const response = await http.post<GroupMember>('/groups/add_member', { email, groupId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateGroup: async (groupId: string, name: string, description: string, isPublic: boolean): Promise<Group> => {
    try {
      const response = await http.put<Group>('/groups/update_group', { groupId, name, description, isPublic });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  removeMemberFromGroup: async (memberId: string, groupId: string): Promise<void> => {
    try {
      await http.post<void>('/groups/remove_member', { memberId, groupId });
    } catch (error) {
      throw error;
    }
  },

  deleteGroup: async (groupId: string): Promise<void> => {
    try {
      await http.delete<void>(`/groups/${groupId}`);
    } catch (error) {
      throw error;
    }
  },
};

export default groupAPI;
