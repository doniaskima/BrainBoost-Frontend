import React from "react";
import "./styles/main.css"


import Alert from "./Alert";
import Contact from "./Contact";
import Icon from "../Icon";
 
const randomContactProps = {
    contact: {
      id: 1,
      name: "John Doe",
      profile_picture: "path/to/profile-picture.jpg",
      messages: {
        "2023-06-21": [
          {
            content: "Hello!",
            time: "15:30",
            status: "sent",
          },
          {
            content: "How are you?",
            time: "15:32",
            status: "read",
          },
        ],
      },
      unread: 3,
      typing: false,
      pinned: true,
    },
  };
const Sidebar: React.FC = () => {


  return (
    <aside className="sidebar">
      <header className="header">
        <div className="sidebar__avatar-wrapper">
        
        </div>
        <div className="sidebar__actions">
          <button className="sidebar__action" aria-label="Status">
            <Icon
              id="status"
              className="sidebar__action-icon sidebar__action-icon--status"
            />
          </button>
          <button className="sidebar__action" aria-label="New chat">
            <Icon id="chat" className="sidebar__action-icon" />
          </button>
      
        </div>
      </header>
      <Alert />
      <div className="sidebar__contacts">
       
      <Contact {...randomContactProps} />
      <Contact {...randomContactProps} />
      <Contact {...randomContactProps} />
      <Contact {...randomContactProps} />
      </div>
    </aside>
  );
};

export default Sidebar;
