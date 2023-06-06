import React, { ReactNode, useEffect, useState } from "react";
import { useSocket } from "../socket";
import { DataProvider } from "../context/dataProvider";
import { Settings } from "../components/Chat/Settings";
import { LeftSection } from "../components/Chat/LeftSection";
import { useAuth } from "../context/authProvider";
import RightSection from "../components/Chat/RightSection";
import { useParams } from "react-router-dom";


const Chat = (props:any) => {

  const { recipientId } = useParams();
  const user = useAuth();
  const [leftSide,setLeftSide] =useState(false);
  const socket = useSocket((state)=>state.socket);
  useEffect(() => {
    socket.emit("connectUser", { name: user.name });
  }, []);
  
  return (
    <DataProvider> 
    <div className="min-h-screen bg-background  ">
        <div className="ml-auto mr-auto flex h-screen lg:h-900 w-full bg-back rounded-md">
           {
            leftSide ? (
              <Settings setLeftSide={setLeftSide} />
            ) : (
             <div>
               <LeftSection setLeftSide={setLeftSide}/>
             </div>
            )
           }
           {
            location.pathname === "/chat" ?(
              <div className="hidden md:flex bg-cyanShade h-full justify-center items-center w-full ">
                <p className="text-2xl text-Decent font-bold animate-bounce rounded-sm italic cursor-pointer font-sans">
                  Brainboost Chat
                </p>
              </div>
            ) : (
              <div className="absolute  w-full lg:w-full h-full ">
                {props.children}
              </div>
            )
           }
            {recipientId && (
            <div className="   w-full lg:w-full h-full">
              <RightSection recipientId={recipientId} />
            </div>
          )}
        </div>
    </div>
    </DataProvider>
  )
};

export default Chat;
