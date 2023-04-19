import React , {ReactNode} from 'react';

interface Props {
    children:ReactNode;
    className?:string;
}


const Duration = ({ children, className = "", ...props }: Props) => (
    <span {...props} className={`text-sm text-gray-700 dark:text-gray-400 font-semibold ${className}`}>
      {children}
    </span>
  );
  
export default Duration;