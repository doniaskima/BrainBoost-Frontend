import React from "react";
import { useNavigate } from "react-router";

const RightSection = () => {
    const navigate=useNavigate();
  return (
    <div className="flex w-full h-screen lg:h-600">
        <div className="shadow-lg h-full flex w-full flew-col">
            <div className="relative w-full px-3 py-2 shadow-md h-12 rounded-tr-md  bg-white font-medium">
                <i
                role="button"
                className="md:hidden fa fa-arrow-left mt-2 mr-3 "
                onClick={()=>navigate(-1)}
                >
                    HOOOO
                </i>
            </div>
        </div>
    </div>
  )
};

export default RightSection;
