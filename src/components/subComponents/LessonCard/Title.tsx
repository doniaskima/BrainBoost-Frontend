import React from "react";

interface TitleProps extends React.HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ children, className, ...props }) => {
  return (
    <h3 {...props} className={`${className || ""} block text-gray-800 dark:text-gray-50 text-lg font-medium`}>
      {children}
    </h3>
  );
};
