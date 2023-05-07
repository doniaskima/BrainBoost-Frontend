import React, { useState } from "react";
import Settings from "../components/Chat/Settings";
import LeftSection from "../components/Chat/LeftSection";

 const Chat = (props:any) => {
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
        {/* {
             props.location.pathname === "/chat" ? (
              <div className="hidden md:flex bg-cyanShade h-full justify-center rounded-r-md items-center w-full">
              <p className="text-2xl text-white font-bold animate-bounce">
                BrainBoost Chat
              </p>
            </div>
             ) : (
            <div className="absolute md:static w-full lg:w-full h-full">
              {props.children}
            </div>
             )
        } */}
      </div>
    </div>
  )
};

export default Chat;
