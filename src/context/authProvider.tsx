import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { BASE_URL } from "../utils/utils";
import { useNavigate } from "react-router-dom";


export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
}
 

interface AuthContextValue {
    user: User | null;
    loginWithUserCredentials: (email: string, password: string) => Promise<any>;
    emailValidate: (email: string) => boolean;
    signupWithUserCredentials: (name: string, email: string, password: string) => Promise<any>;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
  
  
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  });
  const [token, setToken] = useState<string>(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken || "";
  });

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  axios.interceptors.response.use(undefined, function (error) {
    if (
      error?.response?.status === 401 ||
      error?.response?.status === 403 ||
      error?.response?.data?.message === "Invalid Token"
    ) {
      logout();
    }
    return Promise.reject(error);
  });

  async function loginWithUserCredentials(email: string, password: string) {
    const {
      data: { message, user, token, status },
    } = await axios.post(`${BASE_URL}/users/login`, {
      email: email,
      password: password,
    });
    if (status) {
      setUser(user);
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
    }
    return { user, token, message };
  }

  async function signupWithUserCredentials(name: string, email: string, password: string) {
    const {
      data: { message, user, token, status },
    } = await axios.post(`${BASE_URL}/users/signup`, {
      name: name,
      email: email,
      password: password,
    });
    if (status) {
      setUser(user);
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
    }
    return { user, token, message };
  }

  function emailValidate(email: string) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  }

  const logout = () => {
    axios.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const authContextValue: AuthContextValue = {
    user,
    loginWithUserCredentials,
    emailValidate,
    signupWithUserCredentials,
    logout,
    setUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
