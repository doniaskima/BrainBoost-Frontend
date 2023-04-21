import './styles/globals.css'
import styled, { keyframes, ThemeProvider } from 'styled-components';
import HeroPage from './pages/HeroPage';
import Login from './components/Auth/Login';
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from './components/Auth/Signup';
import "./App.css"
import Reset from './components/Auth/Reset';
import ResetPasswordRequestPage from "./components/Auth/ResetPasswordRequestPage"
import { useAppDispatch } from './store/hooks';
import { useEffect, useState } from 'react';
import { attemptGetUser } from './store/thunks/user';
import { ConfirmPage } from './components/Auth';
import Home from './pages/Home';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(attemptGetUser())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3900/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "string",
          "Content-Type": "string",
          "Access-Control-Allow-Credentials": "true",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);



  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/login"    element={user ? <Navigate to="/home" /> : <Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<Reset />} />
      <Route path="/login/forgot" element={ <ResetPasswordRequestPage />} />
      <Route path="/account/confirm/:token" element={ <ConfirmPage  />} />
      <Route path="/home" element={ <Home  />} />
    </Routes>
    </div>
  )
}

export default App
