import React, { useState } from "react";
import { useAuth } from "../../context/authProvider";


const LeftUpperHeader = ({setLeftSide}: {setLeftSide: (value: boolean) => void}) => {
  const { user, logout } = useAuth();
  const [showMenu,setShowMenu]=useState(false);
  
  return (
    <div className="w-full shadow-md relative h-12 flex px-3 py-1 border-gray-400 items-center">
      <div className="font-semibold">Hi {user?.name}</div>
      <div className="ml-auto w-full">
        <i
          onClick={() => setShowMenu((prevState) => !prevState)}
          className="fa fa-ellipsis-v ml-4 cursor-pointer "
        ></i>
      </div>
      {showMenu && (
        <div className="bg-black select-none absolute right-2 mt-2 top-3/4 shadow-md rounded-md text-gray-200">
          <ul>
            <li>
              <button className="px-3 py-2" onClick={() => setLeftSide(true)}>
                settings
              </button>
            </li>
            <li>
              <button  className="px-3 py-2">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
};

export default LeftUpperHeader;
