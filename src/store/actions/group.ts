export const GET_GROUP_MEMBERS = "GET_GROUP_MEMBERS";
export const CREATE_GROUP = "CREATE_GROUP";
export const ADD_MEMBER = "ADD_MEMBER";
export const UPDATE_GROUP = "UPDATE_GROUP";
export const REMOVE_MEMBER = "REMOVE_MEMBER";
export const DELETE_GROUP = "DELETE_GROUP";
export const ADD_GROUP = "ADD_GROUP";
export const REMOVE_GROUP = "REMOVE_GROUP";

export interface GroupMember {
  id: string;
  name: string;
  email: string;
}

export interface Group {
  id: string;
  adminId: string;
  groupName: string;
  isPublic: boolean;
  description: string;
}

export interface GroupState {
  members: GroupMember[];
  groups: Group[];
}

export interface GetGroupMembersAction {
  type: typeof GET_GROUP_MEMBERS;
  members: GroupMember[];
}

export interface CreateGroupAction {
  type: typeof CREATE_GROUP;
  group: Group;
}

export interface AddMemberAction {
  type: typeof ADD_MEMBER;
  member: GroupMember;
}

export interface UpdateGroupAction {
  type: typeof UPDATE_GROUP;
  group: Group;
}

export interface RemoveMemberAction {
  type: typeof REMOVE_MEMBER;
  memberId: string;
}

export interface DeleteGroupAction {
  type: typeof DELETE_GROUP;
  groupId: string;
}

export interface AddGroupAction {
  type: typeof ADD_GROUP;
  group: Group;
}

export interface RemoveGroupAction {
  type: typeof REMOVE_GROUP;
  groupId: string;
}

export type GroupActionTypes =
  | GetGroupMembersAction
  | CreateGroupAction
  | AddMemberAction
  | UpdateGroupAction
  | RemoveMemberAction
  | DeleteGroupAction
  | AddGroupAction
  | RemoveGroupAction;

export function getGroupMembers(members: GroupMember[]): GetGroupMembersAction {
  return {
    type: GET_GROUP_MEMBERS,
    members,
  };
}

export function createGroup(group: Group): CreateGroupAction {
  return {
    type: CREATE_GROUP,
    group,
  };
}

export function addMember(member: GroupMember): AddMemberAction {
  return {
    type: ADD_MEMBER,
    member,
  };
}

export function updateGroup(group: Group): UpdateGroupAction {
  return {
    type: UPDATE_GROUP,
    group,
  };
}

export function removeMember(memberId: string): RemoveMemberAction {
  return {
    type: REMOVE_MEMBER,
    memberId,
  };
}

export function deleteGroup(groupId: string): DeleteGroupAction {
  return {
    type: DELETE_GROUP,
    groupId,
  };
}

export function addGroup(group: Group): AddGroupAction {
  return {
    type: ADD_GROUP,
    group,
  };
}

export function removeGroup(groupId: string): RemoveGroupAction {
  return {
    type: REMOVE_GROUP,
    groupId,
  };
}
