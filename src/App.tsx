import React, { Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled, { keyframes, ThemeProvider } from 'styled-components';

// CSS imports
import './styles/globals.css';
import './App.css';
import './styles/main.scss';
import './assets/css/style.css';

// Page components
import HeroPage from './pages/HeroPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Reset from './components/Auth/Reset';
import ResetPasswordRequestPage from './components/Auth/ResetPasswordRequestPage';
import Home from './pages/Home';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Chat from './pages/Chat';
import Courses from './pages/Courses';
import Drive from './pages/Drive';
import Notification from './pages/Notification';
import PomodroTimer from './pages/PomodroTimer';
import StudyWithme from './pages/StudyWithme';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import MemberProject from './pages/MemberProject';

// Component imports
import { ConfirmPage } from './components/Auth';
import { AuthRoute } from './components/AuthRoute';
import RightSection from './components/Chat/RightSection';
import { AuthProvider } from './context/authProvider';
 


function App() {
  const [loading, setLoading] = useState(true);

  return (
  <div className="App">
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/login/forgot" element={ <ResetPasswordRequestPage />} />
      <Route path="/account/confirm/:token" element={ <ConfirmPage  />} /> */}
      <Route path="/home" element={<Home />} />
      {/* <Route
        path='/login/reset/:token'
        element={
          <AuthRoute>
            <ResetPasswordPage />
          </AuthRoute>
        }
      /> */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:recipientId" element={<Chat />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/drive" element={<Drive />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/pomodroTimer" element={<PomodroTimer />} />
      <Route path="/studyWithme" element={<StudyWithme />} />
      <Route path="tasks/member-project/:projectId" element={<MemberProject/>} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </div>

 
  );
}

export default App;