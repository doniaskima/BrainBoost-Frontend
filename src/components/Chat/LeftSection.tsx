import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';
import { fetchMessages, fetchGroupMessages, deleteMessage as deleteMessageApi } from '../../api/messageApi';
import { getMessages, getGroupMessages, deleteMessage, Message, MessageActionTypes } from '../../store/actions/message';
import { AppState } from '../../store/store';
import { setUser, resetUser, User, Recipient, Group, login, logout , updateUserSuccess, deleteUserSuccess, getUserSuccess, getSavedMessagesSuccess, deleteSavedMessageSuccess, getRecipientsSuccess, getGroupsSuccess } from '../../store/actions/user'; // Update import statements
import { Link } from 'react-router-dom';
import { ChatCardWrapper } from './ChatCardWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../socket';
import { useEffect, useState } from 'react';
import { getGroupMessagesThunk, getMessagesThunk } from '../../store/thunks/message';
import LeftUpperHeader from './LeftUpperHeader';
import { CreateMenu } from './CreateMenu';
import { StartConversation } from './StartConversation';

interface LeftSectionProps {
  setLeftSide: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LeftSection: React.FC<LeftSectionProps> = ({ setLeftSide }) => {
  const socket = useSocket((state) => state.socket);
  const dispatch: ThunkDispatch<AppState, undefined, MessageActionTypes> = useDispatch();
  const recipients = useSelector((state: AppState) => state.user.recipients);
  const groups = useSelector((state: AppState) => state.user.groups);
  const [showStartMessage, setShowStartMessage] = useState(false);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);

  // useEffect(() => {
  //   dispatch(setUser());
  //   dispatch(getRecipientsSuccess([]));
  //   dispatch(getGroupsSuccess([]));
  // }, [dispatch]);

  const handleRecipientClick = (recipient: Recipient) => {
    const senderId = "";
    dispatch(getMessagesThunk(senderId, recipient.id));
  };

  const handleGroupClick = (group: Group) => {
    const userId = "";
    dispatch(getGroupMessagesThunk(userId, group.id));
  };

  return (
    <div className="flex-col flex w-full md:w-2/3 lg:w-1/3" id="leftSection">
      <LeftUpperHeader setLeftSide={setLeftSide} />
      <div className="overflow-y-auto h-full">
        <CreateMenu
          setShowStartMessage={setShowStartMessage}
          setShowCreateGroupForm={setShowCreateGroupForm}
        />
        {showStartMessage && <StartConversation setShowStartMessage={setShowStartMessage} />}

        {recipients.map((recipient) => (
          <Link
            to={recipient.id}
            key={recipient.id}
            state={recipient}
            onClick={() => handleRecipientClick(recipient)}
          >
            <ChatCardWrapper>{recipient.name}</ChatCardWrapper>
          </Link>
        ))}

        {groups.map((group) => (
          <Link
            to={group.id}
            key={group.id}
            state={group}
            onClick={() => handleGroupClick(group)}
          >
            <ChatCardWrapper>{group.name}</ChatCardWrapper>
          </Link>
        ))}
      </div>
    </div>
  );
};
