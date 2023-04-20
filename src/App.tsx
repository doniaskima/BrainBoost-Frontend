import './styles/globals.css'
import styled, { keyframes, ThemeProvider } from 'styled-components';
import HeroPage from './pages/HeroPage';
import Login from './components/Auth/Login';
import { Route, Routes } from "react-router-dom";
import Signup from './components/Auth/Signup';
import "./App.css"
import Reset from './components/Auth/Reset';
import ResetPasswordRequestPage from "./components/Auth/ResetPasswordRequestPage"
import { useAppDispatch } from './store/hooks';
import { useEffect, useState } from 'react';
import { attemptGetUser } from './store/thunks/user';
import { ConfirmPage } from './components/Auth';

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


  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<Reset />} />
      <Route path="/login/forgot" element={ <ResetPasswordRequestPage />} />
      <Route path="/account/confirm/:token" element={ <ConfirmPage  />} />
    </Routes>
    </div>
  )
}

export default App
