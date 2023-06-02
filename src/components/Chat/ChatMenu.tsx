import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { RouteProps, useNavigate } from "react-router-dom";
import { removeRecipient } from "../../store/actions/user";
import { removeGroup } from "../../store/actions/group";

const BASE_URL = "http://localhost:3000"

interface ChatMenuProps extends RouteProps {
  recipient: any;
  setShowRecipientDetails: (show: boolean) => void;
  setShowMenu: (show: boolean) => void;
}

export const ChatMenu: React.FC<ChatMenuProps> = ({
  recipient,
  setShowRecipientDetails,
  setShowMenu,
}) => {
  const user = useSelector((state: AppState) => state.user.user);
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
    await axios.delete(`${BASE_URL}/users/deleteRecipient`, {
      data: {
        senderId: user?._id,
        recipientId: recipient?._id,
      },
    });
    removeRecipient(recipient?._id);
    navigate(-1);
  };

  const leaveGroupHandler = async () => {
    await axios.post(`${BASE_URL}/groups/remove_member`, {
      groupId: recipient?._id,
      memberId: user?._id,
    });
    removeGroup(recipient?._id);
    navigate(-1);
  };

  return (
    <div className="absolute right-8 top-4 whitespace-nowrap bg-background text-sm text-white rounded-md cursor-pointer">
      <div
        className="py-1 px-2 "
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
