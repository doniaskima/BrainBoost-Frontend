import React, { useState } from "react";
import dayjs from "dayjs";
import { decryptMessage } from "../../utils/utils";
import { useAuth } from "../../context/authProvider";

interface MessageProps {
  msg: any;
  isAdmin: boolean;
  isGroup: boolean;
  messageDeleteHandler: (msg: any) => void;
}

const Message: React.FC<MessageProps> = ({
  msg,
  isAdmin,
  isGroup,
  messageDeleteHandler,
}) => {
   const { user } = useAuth();
   const time = dayjs(msg.createdAt).format("h.mm a");
   const decryptedMessage = decryptMessage(msg.key, msg.message, msg.iv);
   const [showMessageOptions, setShowMessageOptions] = useState(false);
   const isMessageSentByClient = msg?.sender?.name === (user ? user.name : null);


  return (
    <div
      onMouseEnter={() => setShowMessageOptions(true)}
      onMouseLeave={() => setShowMessageOptions(false)}
      className="flex w-full relative items-end my-2"
    >
      <div
        className={`relative w-min whitespace-nowrap py-2  px-3 rounded-3xl shadow-xl  ${
          isMessageSentByClient
            ? "bg-background text-white rounded-br-none ml-auto"
            : "text-black bg-white rounded-bl-none"
        }`}
      >
        {showMessageOptions && isAdmin && (
          <i
            role="button"
            aria-label="Delete Message"
            className={`absolute fa fa-trash text-red-500 bottom-0
            ${isMessageSentByClient ? "-left-7" : "-right-7"}
          `}
            onClick={() => messageDeleteHandler(msg)}
          />
        )}
        {isGroup && (
          <p className="font-medium">
            {!isMessageSentByClient && msg?.sender?.name}
          </p>
        )}
        <div className="flex justify-between items-end">
          <span className="mr-2">{decryptedMessage}</span>
          <span className="text-exs ">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
