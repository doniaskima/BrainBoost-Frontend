import React, { useState } from "react";
import Settings from "../components/Chat/Settings";
import LeftSection from "../components/Chat/LeftSection";
 const Chat = () => {
  const [leftSide, setLeftSide]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);
  return (
    <div className="min-h-screen bg-background lg:px-26 lg:pt-14">
      <div className="mr-auto ml-auto flex h-screen lg:h-600 w-full bg-back rounded-md">
        {
          leftSide ?(
            <Settings setLeftSide={setLeftSide} />
          ) : (
            <LeftSection setLeftSide={setLeftSide}/>
          )
        }
      </div>
    </div>
  )
};

export default Chat;
