import dayjs from "dayjs";
import { useEffect } from "react";
import { axiosDelete } from "../../utils/utils";
import { useAuth } from "../../context/authProvider";
import { GroupMembers } from "./GroupMembers";
import { useData } from "../../context/dataProvider";
import { useNavigate } from "react-router-dom";
import { UpdateGroupInfoForm } from "./UpdateGroupInfo";


interface InfoProps {
  recipient: {
    admin: string;
    createdAt: string;
    groupCode?: string;
    _id: string;
  };
  setShowRecipientDetails: (value: boolean) => void;
}

export const Info: React.FC<InfoProps> = ({ recipient, setShowRecipientDetails }) => {
  const navigate = useNavigate() ;
  const { user } = useAuth();
  const isAdmin = recipient?.admin === (user ? user._id : null);
  const time = dayjs(recipient?.createdAt).format("h.mm a");
  const date = dayjs(recipient?.createdAt).format("DD/MM/YYYY");
  const isGroup = recipient?.groupCode ? true : false;
  const leftSection = document.getElementById("leftSection");
  const { removeGroup } = useData();

  const closeInfo = () => setShowRecipientDetails(false);

  useEffect(() => {
    leftSection?.addEventListener("click", closeInfo);
    // cleanup
    return () => {
      leftSection?.removeEventListener("click", closeInfo);
    };
  }, [leftSection]);

  const deleteGroup = async () => {
    await axiosDelete("groups", recipient?._id);
    removeGroup(recipient?._id);
    navigate(-1);
  };

  return (
    <div className="absolute w-full h-screen md:h-full md:w-3/5 lg:static bg-back">
      <div className="relative z-10 flex items-center w-full px-3 justify-between shadow-md h-11 rounded-tr-md bg-white font-medium">
        <span>Info</span>
        <i
          className="fa fa-close"
          onClick={() => setShowRecipientDetails(false)}
        ></i>
      </div>
      <div className="flex flex-col overflow-y-auto">
        <div className="border-2 border-gray-200 mt-4 px-3 py-2 text-sm bg-white">
          <i className="far fa-calendar-alt mr-2"></i>
          <span>{`${isGroup ? "Created" : "Joined"} on ${date} at ${time}`}</span>
        </div>
        {isGroup && (
          <UpdateGroupInfoForm
            group={recipient}
            isAdmin={isAdmin}
            setShowRecipientDetails={setShowRecipientDetails}
          />
        )}
        {isGroup && <GroupMembers group={recipient} isAdmin={isAdmin} />}
        {isAdmin && (
          <div className="border-2 border-gray-200 px-3 py-2">
            <div
              className="flex justify-between items-center text-red-600 cursor-pointer"
              onClick={() => deleteGroup()}
            >
              <span>Delete Group</span>
              <i className="fa fa-trash"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
