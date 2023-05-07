import React from "react";
import { useNavigate } from "react-router-dom";

const ChatMenu = ({
  recipient,
  setShowRecipientDetails,
  setShowMenu,
}) => {
  return (
    <div className="absolute right-8 top-4 whitespace-nowrap bg-background text-sm text-white rounded-md cursor-pointer ">
      <div 
       className="py-1 px-2 "
       onClick={() => {
         setShowRecipientDetails(true);
         setShowMenu(false);
       }}
      >
        Show Info
      </div>
    </div>
  )
};

export default ChatMenu;
