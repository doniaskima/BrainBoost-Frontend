import React from 'react';
import error from "../../assets/download.png"

const FNf: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-white flex-col lg:col-span-2 lg:w-auto">
        <img src={error} alt="w-56 h-56 items-center m-4"   />
        <h4 className="text-gray-900">
         This page is not available.
        </h4>
        <p style={{ textAlign: 'center' }}>
        The URL is broken or must be removed from our server. That's all we know.
        </p>
    </div>
  );
};

export default FNf;
