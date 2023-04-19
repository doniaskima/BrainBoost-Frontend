import React from "react";

interface SubTitleProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export const SubTitle: React.FC<SubTitleProps> = ({ children, className }) => {
    return (
      <span className={`${className || ""} text-blue-600 dark:text-sky-500 font-semibold`}>
        {children}
      </span>
    );
  };