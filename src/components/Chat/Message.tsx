import React, { useState } from "react";
import dayjs from "dayjs";

const Message = () => {
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  return (
    <div
    onMouseEnter={()=>setShowMessageOptions(true)}
    onMouseLeave={()=> setShowMessageOptions(false)}
    className="flex w-full relative items-end my-2">
      <div className="relative w-min whitespace-nowrap py-2  px-3 rounded-3xl shadow-xl">
      </div>
    </div>
  )
};

export default Message;
