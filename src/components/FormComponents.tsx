import React, { useState } from "react";

interface InputProps {
  callback: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
  type: string;
}

export const Input: React.FC<InputProps> = ({
  callback,
  placeholder,
  value,
  type,
}) => {
  return (
    <input
      required
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={callback}
      className="w-full md:w-72 bg-transparent border-2 px-3 py-2 outline-none border-black rounded-md"
    />
  );
};

interface PasswordFieldProps {
  callback: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  callback,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="my-3 border-2 border-black w-full md:w-72 py-2 px-3 text-left rounded-md md:ml-9 flex items-center">
      <input
        required
        aria-label="Password Input Field"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="outline-none w-11/12"
        value={value}
        onChange={callback}
      />
      {showPassword ? (
        <i
          role="button"
          aria-label="Show password"
          onClick={() => setShowPassword(!showPassword)}
          className="fa fa-eye-slash float-right cursor-pointer"
        />
      ) : (
        <i
          role="button"
          aria-label="Hide password"
          onClick={() => setShowPassword(!showPassword)}
          className="fa fa-eye float-right cursor-pointer"
        />
      )}
    </div>
  );
};
