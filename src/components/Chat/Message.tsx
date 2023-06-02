import dayjs from "dayjs";
import { useState } from "react";
import { decryptMessage } from "../../utils/utils";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";

interface MessageProps {
  msg: Message;
  isAdmin: boolean;
  isGroup: boolean;
  messageDeleteHandler: (msg: Message) => void;
}

interface Message {
  createdAt: string;
  key: string;
  message: string;
  iv: string;
  sender: Sender | null;
}

interface Sender {
  name: string;
}

const Message: React.FC<MessageProps> = ({
  msg,
  isAdmin,
  isGroup,
  messageDeleteHandler,
}) => {
  const user = useSelector((state: AppState) => state.user.user);
  const time = dayjs(msg.createdAt).format("h.mm a");
  const decryptedMessage = decryptMessage(msg.key, msg.message, msg.iv);
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const isMessageSentByClient = msg?.sender?.name === user?.username;

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
