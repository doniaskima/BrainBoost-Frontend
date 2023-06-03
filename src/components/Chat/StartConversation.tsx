import React from "react";
import axios from "axios";
import { useState, FormEvent } from "react";
import { useSocket } from "../../socket";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { addRecipient } from "../../store/reducers/recipientsSlice"; 
import { emailValidate } from "../../utils/utils";
const BASE_URL = "http://localhost:3000";


interface StartConversationProps {
  setShowStartMessage : (show : boolean) => void
}

export const StartConversation : React.FC<StartConversationProps> = ({ setShowStartMessage }) => {
  const socket = useSocket((state) => state.socket);
  const user = useSelector((state: AppState) => state.user);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const startMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailValidate(email)) {
      try {
        const {
          data: { status, user: recipient },
        } = await axios.get<{ status: boolean; user: any }>(
          `${BASE_URL}/users/get_by_email/${email}`
        );
        if (status) {
          socket.emit("startMessage", {
            // senderId: user.id,
            // receiverEmail: email,
            // senderEmail: user.email,
          });
          addRecipient(recipient);
          setShowStartMessage(false);
          return;
        }
        setError("Recipient not found");
        return;
      } catch (error) {
        setError("An error occurred");
        console.log(error);
        return;
      }
    }
    setError("Enter a valid email");
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

 
