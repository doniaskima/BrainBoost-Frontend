import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeftUpperHeader from "./LeftUpperHeader";
import { useSocket } from "../../socket";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { addRecipient } from "../../store/reducers/recipientsSlice";
import { CreateMenu } from "./CreateMenu";
import { StartConversation } from "./StartConversation";
import { CreateGroupForm } from "./CreateGroupForm";
import SavedMessagesTile from "./SavedMessagesTile";
 



const LeftSection = ({setLeftSide}: {setLeftSide: (value: boolean) => void}) => {
  const socket = useSocket((state)=>state.socket);
  const [showStartMessage, setShowStartMessage] = useState(false);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const user = useSelector((state: AppState) => state.user);
  const recipients = useSelector((state: AppState) => state.recipients);
  const loading = useSelector((state:AppState)=>state.user);
   console.log(loading);
   console.log(recipients)

   useEffect(() => {
    socket.on("newRecipient", (info) => {
      addRecipient(info.sender);
    });

    return () => {
      socket.off("newRecipient", (info) => {
        addRecipient(info.sender);
      });
    };
  }, []);
  
 
   return (
    <div className="flex-col flex w-full md:w-2/3 lg:<-1/3">
       <LeftUpperHeader setLeftSide={setLeftSide} />
       <div className="overflow h-full">
        <CreateMenu
           setShowStartMessage={setShowStartMessage}
           setShowCreateGroupForm={setShowCreateGroupForm}
        />
           {showStartMessage && (
            <StartConversation setShowStartMessage={setShowStartMessage} />
          )}

        {showCreateGroupForm && (
           <CreateGroupForm setShowCreateGroupForm={setShowCreateGroupForm} />
        )}
         <SavedMessagesTile />
      
       </div>
    </div>
  )
};

export default LeftSection;