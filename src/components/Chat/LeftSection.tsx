import React, { useEffect, useState } from "react";
import { useData } from "../../context/dataProvider";
import { CreateGroupForm } from "./CreateGroupForm";
import { Link } from "react-router-dom";
import { useSocket } from "../../socket";
import LeftUpperHeader from "./LeftUpperHeader";
import { CreateMenu } from "./CreateMenu";
import { StartConversation } from "./StartConversation";
import Spinner from "../Spinner"
import { ChatCardWrapper } from "./ChatCardWrapper";
import { SavedMessagesTile } from "./SavedMessageTile";

interface LeftSectionProps {
  setLeftSide: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LeftSection: React.FC<LeftSectionProps> = ({ setLeftSide }) => {
  const socket = useSocket((state) => state.socket);
  const [showStartMessage, setShowStartMessage] = useState(false);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const { groups, recipients, addRecipient, loading } = useData();

  useEffect(() => {
    socket.on("newRecipient", (info: any) => {
      addRecipient(info.sender);
    });

    return () => {
      socket.off("newRecipient", (info: any) => {
        addRecipient(info.sender);
      });
    };
  }, []);

  return (
    <aside className="sidebar">
      <LeftUpperHeader setLeftSide={setLeftSide} />
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
        {loading ? (
          <div className="flex justify-center mt-2">
            <Spinner />
          </div>
        ) : (
          recipients?.map((recipient: any) => {
            return (
              <Link to={recipient._id} key={recipient._id} state={recipient}>
                <ChatCardWrapper>{recipient.name}</ChatCardWrapper>
              </Link>
            );
          })
        )}
        {groups?.map((group: any) => {
          return (
            <Link to={group._id} key={group._id} state={group}>
              <ChatCardWrapper>{group?.name}</ChatCardWrapper>
            </Link>
          );
        })}
      </aside>
 
  );
};
