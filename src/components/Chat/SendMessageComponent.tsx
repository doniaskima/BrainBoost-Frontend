import React, { useState } from "react";
import { useSocket } from "../../socket";
import { useAuth } from "../../context/authProvider";

interface SendMessageComponentProps {
  recipient: any;
  isGroup: boolean;
}

export const SendMessageComponent: React.FC<SendMessageComponentProps> = ({
  recipient,
  isGroup,
}) => {
  const { user } = useAuth();
  const [showEmojis, setShowEmojis] = useState(false);
  const [message, setMessage] = useState("");
  const socket = useSocket((state) => state.socket);
 

  const sendHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (recipient?.type === "saved") {
      socket.emit("saveMessage", {
        user: user,
        message: message,
      });
      return;
    }
    if (isGroup) {
      socket.emit("sendGroupMessage", {
        sender: user,
        group: recipient,
        message: message,
      });
      return;
    } else {
      socket.emit("sendMessage", {
        sender: user,
        receiver: recipient,
        message: message,
      });
    }
  };

  return (
    <div className="relative flex bg-white w-full rounded-br-md justify-end px-5">
      <button onClick={() => setShowEmojis(!showEmojis)}>
        <i className="far fa-smile text-xl"></i>
      </button>
      {showEmojis && (
        <div
          className="absolute bg-back flex flex-wrap left-0 -top-52 overflow-y-auto w-96 h-52"
        >
         
        </div>
      )}
      <form
        className="flex items-center py-2 w-full"
        onSubmit={(e) => sendHandler(e)}
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          className="max-h-40 rounded-md shadow-md bg-transparent py-1 px-4 w-full ml-3"
        />

        <button
          type="submit"
          disabled={message === ""}
          className={`bg-white rounded-full whitespace-nowrap shadow-lg px-2 h-10 ml-3 ${
            message === "" ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <i className="fa fa-send text-lg mr-2"></i>Send
        </button>
      </form>
    </div>
  );
};
