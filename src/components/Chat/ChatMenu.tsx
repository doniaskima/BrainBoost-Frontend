import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteUserProfile } from "../../store/reducers/userSlice";

const BASE_URL = "http://localhost:3000";

interface Recipient {
  id: string;
  userId: string;
  name: string;
  // Add more properties as needed
}

interface Group {
  id: string;
  userId: string;
  name: string;
  // Add more properties as needed
}

interface ChatMenuProps {
  recipient: Recipient | Group;
  setShowRecipientDetails: (show: boolean) => void;
  setShowMenu: (show: boolean) => void;
}

export const ChatMenu: React.FC<ChatMenuProps> = ({
  recipient,
  setShowRecipientDetails,
  setShowMenu,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isGroup = recipient?.groupCode ? true : false;

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    window.addEventListener("click", closeMenu);
    // cleanup
    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  const deleteChatHandler = async () => {
    try {
      await axios.delete(`${BASE_URL}/users/deleteRecipient`, {
        data: {
          senderId: recipient.userId,
          recipientId: recipient.id,
        },
      });
      // Dispatch an action to remove the recipient from Redux store
      dispatch(deleteUserProfile(recipient.id));
      navigate(-1);
    } catch (error) {
      // Handle error
    }
  };

  const leaveGroupHandler = async () => {
    try {
      await axios.post(`${BASE_URL}/groups/remove_member`, {
        groupId: recipient.id,
        memberId: recipient.userId,
      });
      // Dispatch an action to remove the group from Redux store
      dispatch(deleteUserProfile(recipient.id));
      navigate(-1);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="absolute right-8 top-4 whitespace-nowrap bg-background text-sm text-white rounded-md cursor-pointer">
      <div
        className="py-1 px-2"
        onClick={() => {
          setShowRecipientDetails(true);
          setShowMenu(false);
        }}
      >
        Show Info
      </div>
      {isGroup ? (
        <div className="py-1 px-2" onClick={() => leaveGroupHandler()}>
          Leave group
        </div>
      ) : (
        <div className="py-1 px-2" onClick={() => deleteChatHandler()}>
          Delete Chat
        </div>
      )}
    </div>
  );
};
