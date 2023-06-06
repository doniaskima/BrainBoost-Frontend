import React, { useRef, useState } from "react";
import { useSocket } from "../../socket";
import { useAuth } from "../../context/authProvider";
import emojiList from "emojis-list";

const emojis: string[] = emojiList.slice(301);

interface FileRef {
  current: HTMLInputElement | null;
}

interface SendMessageComponentProps {
  recipient: any;
  isGroup: boolean;
}

export const SendMessageComponent: React.FC<SendMessageComponentProps> = ({
  recipient,
  isGroup,
}) => {
  const file = useRef<HTMLInputElement | null>(null);
  const { user } = useAuth();
  const [showEmojis, setShowEmojis] = useState(false);
  const [emoji, setEmoji] = useState<string>('');
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

  const handleClick = () => {
    setShowEmojis(!showEmojis);
  };

  const addEmoji = (emoji: string) => {
    setEmoji(emoji);
  };

  const handleClickFile = () => {
    file?.current?.click();
  };


  const handleFileChange = (e) => {
    if (!e.target.files[0]) return;

    const [FileList] = e.target.files;

    // const shareID = sha1.sync(FileList.name + FileList.size);
 
    // const url = URL.createObjectURL(FileList);

    // sendFile(FileList, url, shareID, id);
  };
  return (
    <div className="relative flex bg-white w-full rounded-br-md justify-end px-5">
      <button onClick={handleClick}>
        <i className="far fa-smile text-xl"></i>
      </button>
      <button type="button" title="Pick a file" onClick={handleClickFile} className="gap-4 ml-4">
            <input type="file" ref={file} onChange={handleFileChange} hidden />
            <svg
              title="Send files"
              className="hover:text-accent cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
              />
            </svg>
          </button>
      {showEmojis && (
        <div
          className="absolute
         bg-back flex flex-wrap left-0 -top-52 overflow-y-auto w-96 h-52"
        >
          {emojis.map((emoji, index) => {
            return (
              <div
                className="p-1 cursor-pointer"
                key={index}
                onClick={() => setMessage(message + " " + emoji)}
              >
                {emoji}
              </div>
            );
          })}
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
