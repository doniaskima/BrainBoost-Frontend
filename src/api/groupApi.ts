import { Dispatch } from "redux";
import { getUser, getRecipients, getGroupsByUser } from "../api/index";
import { setUser, resetUser, getRecipientsSuccess, getGroupsSuccess, User, Recipient, Group } from "../store/actions/user";

export const attemptGetUser = () => (dispatch: Dispatch) =>
  getUser()
    .then((response) => {
      const user: User = response.data.user;
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(resetUser());
      }
    })
    .catch(() => {
      dispatch(resetUser());
    });

export const fetchRecipients = (userId: string) => (dispatch: Dispatch) =>
  getRecipients(userId)
    .then((response) => {
      const recipients: Recipient[] = response.data.recipients;
      dispatch(getRecipientsSuccess(recipients));
    })
    .catch((error: Error) => {
     console.log(error);
    });

export const fetchGroups = (userId: string) => (dispatch: Dispatch) =>
  getGroupsByUser(userId)
    .then((response) => {
      const groups: Group[] = response.data.groups;
      dispatch(getGroupsSuccess(groups));
    })
    .catch((error: Error) => {
     console.log(error);
    });
