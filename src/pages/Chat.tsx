import React, { useState } from "react";
import Settings from "../components/Chat/Settings";



const Chat = () => {
  const [leftSide,setLeftSide] =useState(false);
  return (
    <div className="min-h-screen bg-background lg:px-36 lg:pt-14">
        <div className="ml-auto mr-auto flex h-screen lg:h-600 w-full bg-back rounded-md">
           {
            leftSide ? (
              <Settings setLeftSide={setLeftSide} />

              
            ) : (
             <div>
              Hello World
             </div>
            )
           }
        </div>
    </div>
  )
};

export default Chat;
