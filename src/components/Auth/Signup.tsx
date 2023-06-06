import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";
import { PasswordField } from "../FormComponents";
import { Input } from "reactstrap";

const Signup = () => {
  const navigate = useNavigate();
  const { signupWithUserCredentials, emailValidate } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const matchPassword = confirmPassword === password && confirmPassword !== "";
  const isEmptyFields =
    !email.trim().length || !password.trim().length || !name.trim().length;

  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    password
  );

  const signupHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (emailValidate(email)) {
      if (isPasswordValid) {
        if (matchPassword) {
          setLoading(true);
          const { user, message } = await signupWithUserCredentials(
            name,
            email,
            password
          );
          if (user !== null) {
            navigate("/home");
            return;
          }
          setError(message);
          return;
        }
        setError("Both passwords must be the same");
        return;
      }
      setError(
        "Password must be 8 characters long, have one upper and lower case character, and one number."
      );
      return;
    }
    setError("Enter a valid email");
  };

  return (
    <div className="min-h-screen pt-14 background-gif">
      <div className="text-center mr-auto ml-auto bg-white max-w-sm rounded-md">
        <div className="pt-7">
          <h1 className="text-5xl font-bold">Nova Chat</h1>
        </div>
        <div className="py-10 px-3">
          {error !== "" && <p className="text-red-600 mb-2">{error}</p>}
          <form onSubmit={signupHandler}>
            <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={
                  (e) =>setEmail(e.target.value)
                  
                }
              />
            </div>
            <input
              type="password"
              value={password}
              onChange={
                (e) =>   setPassword(e.target.value)
              }
            />
            <div>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={
                  (e) =>   setConfirmPassword(e.target.value)
                }
              />
            </div>
            <button
              type="submit"
              className="mt-8 w-full md:w-72 py-2 rounded-md text-white bg-blue-800"
              disabled={isEmptyFields}
            >
              {loading ? "Signing Up..." : "Sign up"}
            </button>
          </form>
          <p className="my-3">OR</p>
          <Link to="/">
            <button className="border-2 border-background w-full md:w-72 rounded-md h-10 hover:bg-background hover:text-white ">
              {" "}
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
