import React, { FC } from 'react';
import {AiOutlineClose} from "react-icons/ai";

interface ChatSidebarProps {
  active: boolean;
  closeSidebar: () => void;
  heading: string;
  children: React.ReactNode;
}

const ChatSidebar: FC<ChatSidebarProps> = ({ active, closeSidebar, heading, children }) => {
  return (
    <aside className={`chat-sidebar ${active ? "chat-sidebar--active" : ""}`}>
      <header className="header chat-sidebar-header">
        <button onClick={closeSidebar}>
          <AiOutlineClose className="w-4 h-4"/>
        </button>
        <h2 className="chat-sidebar-heading">{heading}</h2>
      </header>
      <div className="sidebar-content">{children}</div>
    </aside>
  );
}

export default ChatSidebar;
