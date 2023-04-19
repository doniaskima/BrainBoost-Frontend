import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ ...props }) => (
    <input
        {...props}
        className={`${props.className || ""
            } w-full px-3 py-2 bg-white text-gray-500 outline-none border dark:border-gray-800 shadow-sm rounded-lg duration-150`}
    />
);

export default Input;
