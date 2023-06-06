import React from "react";
import { SyncLoader } from "react-spinners";

const Spinner: React.FC = () => {
  return (
    <div className="w-12 h-12 flex justify-center align-items-center">
      <SyncLoader color="#36d7b7" />
    </div>
  );
};

export default Spinner;
