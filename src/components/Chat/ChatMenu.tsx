import axios from "axios";
import { useEffect } from "react";
import { useData } from "../../context/dataProvider";
import { BASE_URL } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";
 
interface ChatMenuProps {
  recipient: {
    _id: string;
    groupCode?: string;
  };
  setShowRecipientDetails: (show: boolean) => void;
  setShowMenu: (show: boolean) => void;
}

export const ChatMenu: React.FC<ChatMenuProps> = ({
  recipient,
  setShowRecipientDetails,
  setShowMenu,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { removeRecipient, removeGroup } = useData();
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
    if (user) {
      await axios.delete(`${BASE_URL}/users/deleteRecipient`, {
        data: {
          senderId: user?._id,
          recipientId: recipient._id,
        },
      });
      removeRecipient(recipient._id);
      navigate(-1);
    }
  };
  

  const leaveGroupHandler = async () => {
    await axios.post(`${BASE_URL}/groups/remove_member`, {
      groupId: recipient._id,
      memberId: user?._id,
    });
    removeGroup(recipient._id);
    navigate(-1);
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
        <div className="py-1 px-2" onClick={leaveGroupHandler}>
          Leave group
        </div>
      ) : (
        <div className="py-1 px-2" onClick={deleteChatHandler}>
          Delete Chat
        </div>
      )}
    </div>
  );
};
