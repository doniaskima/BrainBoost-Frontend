import React from "react";
import { IconBase } from "react-icons/lib";
import { Link } from "react-router-dom";
import Icon from "../Icon";
 

interface ContactProps {
  contact: ContactType;
}

interface ContactType {
  id: string;
  name: string;
  profile_picture: string;
  messages: {
    [date: string]: Message[];
  };
  unread?: number;
  typing?: boolean;
  pinned?: boolean;
}

interface Message {
  time: string;
  status: string;
  content: string;
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
 
  const getLastMessage = (): Message | undefined => {
    const messageDates = Object.keys(contact.messages);
    const recentMessageDate = messageDates[messageDates.length - 1];
    const messages = [...contact.messages[recentMessageDate]];
    const lastMessage = messages.pop();
    return lastMessage;
  };

  const lastMessage = getLastMessage();

  return (
    <Link
      className="sidebar-contact"
      to={`/chat/${contact.id}`}
     
    >
      <div className="sidebar-contact__avatar-wrapper">
        <img
          src={contact.profile_picture}
          alt={contact.profile_picture}
          className="avatar"
        />
      </div>
      <div className="sidebar-contact__content">
        <div className="sidebar-contact__top-content">
          <h2 className="sidebar-contact__name"> {contact.name} </h2>
          <span className="sidebar-contact__time">
            {/* {lastMessage && formatTime(lastMessage.time)} */}
          </span>
        </div>
        <div className="sidebar-contact__bottom-content">
          <p className="sidebar-contact__message-wrapper">
            {lastMessage?.status && (
              <IconBase
                id={lastMessage?.status === "sent" ? "singleTick" : "doubleTick"}
                aria-label={lastMessage?.status}
                className={`sidebar-contact__message-icon ${
                  lastMessage?.status === "read"
                    ? "sidebar-contact__message-icon--blue"
                    : ""
                }`}
              />
            )}
            <span
              className={`sidebar-contact__message ${
                !!contact.unread ? "sidebar-contact__message--unread" : ""
              }`}
            >
              {contact.typing ? <i> typing...</i> : lastMessage?.content}
            </span>
          </p>
          <div className="sidebar-contact__icons">
            {contact.pinned && (
              <Icon id="pinned" className="sidebar-contact__icon" />
            )}
            {!!contact.unread && (
              <span className="sidebar-contact__unread">{contact.unread}</span>
            )}
            <button aria-label="sidebar-contact__btn">
              <Icon
                id="downArrow"
                className="sidebar-contact__icon sidebar-contact__icon--dropdown"
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Contact;
