import groupAPI from '../../api/groupApi';
import { ThunkAction } from 'redux-thunk';
import { AppState, thunkDispatch } from '../store';
 
import {
  GroupMember,
  Group,
  GroupActionTypes,
  GET_GROUP_MEMBERS,
  CREATE_GROUP,
  ADD_MEMBER,
  UPDATE_GROUP,
  REMOVE_MEMBER,
  DELETE_GROUP,
} from '../actions/group';


// Thunk Actions
export const getGroupMembersAction = (groupId: string): ThunkAction<void, AppState, null, GroupActionTypes> => {
  return async (dispatch: thunkDispatch) => {
    try {
      const members = await groupAPI.getGroupMembers(groupId);
      dispatch({ type: GET_GROUP_MEMBERS, members });
    } catch (error) {
     console.log(error);
    }
  };
};
  
export const createGroupAction = (adminId: string, groupName: string, isPublic: boolean, description: string): ThunkAction<void, AppState, null, GroupActionTypes> => {
  return async (dispatch: thunkDispatch) => {
    try {
      const group = await groupAPI.createGroup(adminId, groupName, isPublic, description);
      dispatch({ type: CREATE_GROUP, group });
    } catch (error) {
     console.log(error);
    }
  };
};
  
export const addMemberAction = (email: string, groupId: string): ThunkAction<void, AppState, null, GroupActionTypes> => {
  return async (dispatch: thunkDispatch) => {
    try {
      const member = await groupAPI.addMember(email, groupId);
      dispatch({ type: ADD_MEMBER, member });
    } catch (error) {
     console.log(error);
    }
  };
};
  
export const updateGroupAction = (groupId: string, name: string, description: string, isPublic: boolean): ThunkAction<void, AppState, null, GroupActionTypes> => {
  return async (dispatch: thunkDispatch) => {
    try {
      const group = await groupAPI.updateGroup(groupId, name, description, isPublic);
      dispatch({ type: UPDATE_GROUP, group });
    } catch (error) {
     console.log(error);
    }
  };
};
  
export const removeMemberAction = (memberId: string, groupId: string): ThunkAction<void, AppState, null, GroupActionTypes> => {
  return async (dispatch: thunkDispatch) => {
    try {
      await groupAPI.removeMemberFromGroup(memberId, groupId);
      dispatch({ type: REMOVE_MEMBER, memberId });
    } catch (error) {
     console.log(error);
    }
  };
};
  
export const deleteGroupAction = (groupId: string): ThunkAction<void, AppState, null, GroupActionTypes> => {
  return async (dispatch: thunkDispatch) => {
    try {
      await groupAPI.deleteGroup(groupId);
      dispatch({ type: DELETE_GROUP, groupId });
    } catch (error) {
     console.log(error);
    }
  };
};
