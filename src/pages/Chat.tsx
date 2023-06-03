import React, { ReactNode, useEffect, useState } from "react";
import Settings from "../components/Chat/Settings";
import LeftSection from "../components/Chat/LeftSection";
import { useSelector } from 'react-redux';
import { AppState } from '../store/store';
import { useSocket } from "../socket";

interface Props {
  children: ReactNode[];
}

const Chat = (props:any) => {
  const [leftSide,setLeftSide] =useState(false);
  const socket = useSocket((state)=>state.socket);
 

  return (
    <div className="min-h-screen bg-background lg:px-36 lg:pt-14">
        <div className="ml-auto mr-auto flex h-screen lg:h-600 w-full bg-back rounded-md">
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
              <div className="absolute md:static w-full lg:w-full h-full ">
                {props.children}
              </div>
            )
           }
        </div>
    </div>
  )
};

export default Chat;
