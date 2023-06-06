import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/authProvider";
import { useData } from "../../context/dataProvider";
import { BASE_URL } from "../../utils/utils";
import { useSocket } from "../../socket";

interface StartConversationProps {
  setShowStartMessage: (show: boolean) => void;
}

export const StartConversation: React.FC<StartConversationProps> = ({
  setShowStartMessage,
}) => {
  const socket = useSocket((state) => state.socket);
  const { user, emailValidate } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { addRecipient } = useData();

  const startMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (emailValidate(email)) {
      try {
        const {
          data: { status, user: recipient },
        } = await axios.get(`${BASE_URL}/users/get_by_email/${email}`);
        if (status) {
          socket.emit("startMessage", {
            senderId: user?._id,
            receiverEmail: email,
            senderEmail: user?.email,
          });
          addRecipient(recipient);
          setShowStartMessage(false);
          return;
        }
        setError("Recipient not found");
      } catch (error) {
        setError("Error retrieving recipient");
      }
    } else {
      setError("Enter a valid email");
    }
  };

  return (
    <div className="w-full px-2 mb-2">
      {error !== "" && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={(e) => startMessage(e)}>
        <input
          type="text"
          className="rounded-full w-full my-2 px-3 py-1 shadow-md"
          placeholder="Recipient Email"
          value={email}
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
        />
        <button
          type="submit"
          disabled={email === ""}
          className={`rounded-full px-3 py-1 shadow-md ${
            email !== "" ? "cursor-pointer" : "cursor-not-allowed"
          }`}
        >
          Chat
        </button>
        <i
          onClick={() => setShowStartMessage(false)}
          className="fa fa-close ml-2"
        ></i>
      </form>
    </div>
  );
};