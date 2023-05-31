import { GroupState, GroupActionTypes, GET_GROUP_MEMBERS, CREATE_GROUP, ADD_MEMBER, UPDATE_GROUP, REMOVE_MEMBER, DELETE_GROUP } from "../actions/group";

const initialState: GroupState = {
  members: [],
  groups: [],
};

const groupReducer = (state = initialState, action: GroupActionTypes): GroupState => {
  switch (action.type) {
    case GET_GROUP_MEMBERS:
      return {
        ...state,
        members: action.members,
      };
    case CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.group],
      };
    case ADD_MEMBER:
      return {
        ...state,
        members: [...state.members, action.member],
      };
    case UPDATE_GROUP:
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.group.id ? action.group : group
        ),
      };
    case REMOVE_MEMBER:
      return {
        ...state,
        members: state.members.filter((member) => member.id !== action.memberId),
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.groupId),
      };
    default:
      return state;
  }
};

export default groupReducer;
