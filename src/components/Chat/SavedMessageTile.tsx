import React from "react";
import { Link } from "react-router-dom";
import { ChatCardWrapper } from "./ChatCardWrapper";
import { useAuth } from "../../context/authProvider";

export const SavedMessagesTile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Link to={user?._id || ''} state={{ type: "saved" }}>
      <ChatCardWrapper>
        <span className="rounded-full px-2 py-1 border-2 border-gray-400">
          <i className="far fa-bookmark"></i>
        </span>{" "}
        Saved Messages
      </ChatCardWrapper>
    </Link>
  );
};
