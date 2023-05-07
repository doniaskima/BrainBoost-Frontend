import React, { useState } from "react";
import {AiFillSetting} from "react-icons/ai"
import {BsFillTrashFill} from "react-icons/bs"
 

const Settings = ({setLeftSide}: {setLeftSide: (value: boolean) => void}) => {
  const [name,setName]=useState("Donia");
  const [showEditName, setShowEditName] = useState(false);
  return (
    <div className="w-full md:w-2/3 lg:w-1/3 flex flex-col pb-2">
      <div className="shadow-md h-12 flex items-center px-3">
        <AiFillSetting  onClick={() => setLeftSide(false)}/>
        <span className="font-meduim">
          Settings
        </span>
        <div className="border-2 border-gray-300 bg-white mt-4 px-3 py-2">
        <div>
          <span className="font-medium"> Name </span>
          <i
            className="fa fa-pencil float-right"
            onClick={() => setShowEditName(true)}
          ></i>
        </div>
        {showEditName ? (
          <div>
            <form>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-full w-full my-2 px-3 py-1 shadow-md"
              />
              <button
                type="submit"
                disabled={name === "" || name === name}
                className={`rounded-full px-3 py-1 shadow-md ${
                  name === "" || name === name
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Save
              </button>
            </form>
            <i
              onClick={() => {
                setName(name);
                setShowEditName(false);
              }}
              className="fa fa-close ml-2"
            ></i>
          </div>
        ) : (
          <p>{name} </p>
        )}
        </div>
        <div className="border-2 border-gray-200 bg-white mt-4 px-3 py-2">
          <p className="font-medium">Email</p>
          <p>{name}</p>
        </div>
        <div className="border-2 border-gray-200 items-center  text-red-600 cursor-pointer">
        <span>Delete Account</span>
        <BsFillTrashFill/>
        </div>
      </div>
    </div>
  )
};

export default Settings;
