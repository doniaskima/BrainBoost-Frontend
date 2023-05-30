import './styles/globals.css'
import React, { Suspense } from "react";
import styled, { keyframes, ThemeProvider } from 'styled-components';
import HeroPage from './pages/HeroPage';
import Login from './components/Auth/Login';
import { Navigate, Route, Routes  } from "react-router-dom";
import Signup from './components/Auth/Signup';
import "./App.css"
import Reset from './components/Auth/Reset';
import ResetPasswordRequestPage from "./components/Auth/ResetPasswordRequestPage"
import { useAppDispatch } from './store/hooks';
import { useEffect, useState } from 'react';
import { attemptGetUser } from './store/thunks/user';
import { ConfirmPage } from './components/Auth';
import Home from './pages/Home';
import { AuthRoute } from './components/AuthRoute';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Chat from "./pages/Chat";
import Courses from './pages/Courses';
import Drive from './pages/Drive';
import Notification from './pages/Notification';
import PomodroTimer from './pages/PomodroTimer';
import StudyWithme from './pages/StudyWithme';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import "./assets/css/style.css"
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
      <Route path="/login"  element={user ? <Navigate to="/home" /> : <Login />} />
      <Route path="/login/forgot" element={ <ResetPasswordRequestPage />} />
      <Route path="/account/confirm/:token" element={ <ConfirmPage  />} />
      <Route path="/home" element={ <Home  />} />
      <Route
          path='/login/reset/:token'
          element={
            <AuthRoute>
              <ResetPasswordPage />
            </AuthRoute>
          }
        />
      <Route
          path='/signup'
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />
    <Route
         path="/chat"
          element={
           
              <Chat />
           
          }
        />
           <Route
         path="/courses"
          element={
           
              <Courses />
            
          }
        />
           <Route
       path="/drive"
          element={
           
              <Drive />
           
          }
        />
          <Route
          path='/notification'
          element={
           
              <Notification />
          
          }
        />
         <Route
          path='/pomodroTimer'
          element={
           
              <PomodroTimer />
           
          }
        />
         <Route
          path='/studyWithme'
          element={
        
              <StudyWithme />
          
          }
        />
            <Route
          path='/tasks'
          element={
        
              <Tasks />
           
          }
        />
        <Route
         path="/profile"
          element={
         
              <Profile />
           
          }
        />
    </Routes>
    
    </div>
  )
}

export default App
