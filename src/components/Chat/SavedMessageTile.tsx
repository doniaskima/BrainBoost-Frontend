import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { fetchSavedMessages } from "../../store/actions/message";
import { ChatCardWrapper } from "./ChatCardWrapper";

export const SavedMessagesTile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleClick = () => {
    dispatch(fetchSavedMessages(user._id));
  };

  return (
    <Link to={user._id} state={{ type: "saved" }} onClick={handleClick}>
      <ChatCardWrapper>
        <span className="rounded-full px-2 py-1 border-2 border-gray-400">
          <i className="far fa-bookmark"></i>
        </span>{" "}
        Saved Messages
      </ChatCardWrapper>
    </Link>
  );
};
