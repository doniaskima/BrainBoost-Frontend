import React from "react";
import { Link } from "react-router-dom";
import LeftUpperHeader from "./LeftUpperHeader";

const LeftSection = ({setLeftSide}: {setLeftSide: (value: boolean) => void}) => {
  return (
    <div className="flex-col flex w-full md:w-2/3 lg:<-1/3">
       <LeftUpperHeader setLeftSide={setLeftSide} />
       <div className="overflow-y-auto h-full">

       </div>
    </div>
  )
};

export default LeftSection;
