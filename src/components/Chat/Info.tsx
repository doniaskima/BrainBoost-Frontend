// import dayjs from "dayjs";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { AppState } from "../../store/store";

// interface InfoProps {
//   recipient: any;
//   setShowRecipientDetails: (show: boolean) => void;
// }

// export const Info: React.FC<InfoProps> = ({ recipient, setShowRecipientDetails }) => {
//   const user = useSelector((state: AppState) => state.user.user);
//   const navigate = useNavigate();
//   const isAdmin = recipient?.admin === user?._id;
//   const time = dayjs(recipient.createdAt).format("h.mm a");
//   const date = dayjs(recipient.createdAt).format("DD/MM/YYYY");
//   const isGroup = recipient?.groupCode ? true : false;
//   const leftSection = document.getElementById("leftSection");
//   const closeInfo = () => setShowRecipientDetails(false);
  
//   useEffect(() => {
//     leftSection?.addEventListener("click", closeInfo);
//     // cleanup
//     return () => {
//       leftSection?.removeEventListener("click", closeInfo);
//     };
//   }, []);

//   const deleteGroup = async () => {
//     await axiosDelete("groups", recipient._id);
//     removeGroup(recipient._id);
//     navigate(-1);
//   };

//   return (
//     <div className="absolute w-full h-screen md:h-full md:w-3/5 lg:static bg-back">
//       <div className="relative z-10  flex items-center w-full px-3 justify-between shadow-md h-11 rounded-tr-md  bg-white font-medium">
//         <span>Info</span>
//         <i
//           className="fa fa-close"
//           onClick={() => setShowRecipientDetails(false)}
//         ></i>
//       </div>
//       <div className="flex flex-col overflow-y-auto">
//         <div className="border-2 border-gray-200 mt-4 px-3 py-2 text-sm bg-white">
//           <i className="far fa-calendar-alt mr-2"></i>
//           <span>{`${isGroup ? "Created" : "Joined"} on ${date} at ${time}`}</span>
//         </div>
//         {isGroup && (
//           <UpdateGroupInfoForm
//             group={recipient}
//             isAdmin={isAdmin}
//             setShowRecipientDetails={setShowRecipientDetails}
//           />
//         )}
//         {isGroup && <GroupMembers group={recipient} isAdmin={isAdmin} />}
//         {isAdmin && (
//           <div className="border-2 border-gray-200 px-3 py-2">
//             <div
//               className="flex justify-between items-center text-red-600 cursor-pointer"
//               onClick={() => deleteGroup()}
//             >
//               <span>Delete Group</span>
//               <i className="fa fa-trash"></i>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import React from "react";

const Info = () => {
  return <div>Info</div>;
};

export default Info;

