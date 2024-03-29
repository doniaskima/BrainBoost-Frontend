import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled, { keyframes, ThemeProvider } from 'styled-components';

// CSS imports
import './styles/globals.css';
import './App.css';
import './styles/main.scss';
import './assets/css/style.css';
import 'react-toastify/dist/ReactToastify.css';

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
import Chats from "./components/Tasks/Chats"
// Component imports
import Task from './components/Tasks/Task';
import ChooseList from './components/Tasks/ChooseList';
import { ToastContainer, toast } from 'react-toastify';
import PostList from './pages/PostList';
import MyListBlog from './pages/MyListBlog';
import TrainingList from './components/Training/TrainingList';
import YoutubeView from './components/Training/YoutubeView';
import EditorBlog from './components/Blog/EditorBlog';
import { Assignment } from './components/Tasks/InterfaceTask';
import { userService } from './services/user/api';
import socket from './socketioClient';
import UploadCours from './components/Course/UploadCourse';
import ListeOfVideos from './components/Course/ListeOfVideos';
import ListPdf from './components/Course/ListPdf';
import UpdateCourse from './components/Course/updateCourse';
import UploadPdf from './components/Course/UploadPdf';
import SingleQuestion from './components/quiz/SingleQuestion';
import CreataQuizPage from './pages/CreataQuizPage';
import QuizInformation from './components/quiz/QuizInformation';
import ListeQuizz from './components/quiz/ListQuiz';
import { ListQuizPage } from './pages/ListQuizPage';

function App() {
  const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<Assignment | null>(null);
    const navigate = useNavigate();

  useEffect(() => {
    userService
      .getUserInfo()
      .then((res) => {
        if (res.data.data.isActive) {
          setUser({
            _id: res.data.data.userId,
            avatar: res.data.data.avatar,
            email: res.data.data.email,
            role: res.data.data.role,
            username: res.data.data.username,
          });
          if (res.data.data.projects.length > 0) {
            res.data.data.projects.map((projectId) => {
              socket.emit('online', {
                roomId: projectId,
                userId: res.data.data.userId,
              });
              return 0;
            });
          } else {
            socket.emit('online', {
              roomId: undefined,
              userId: res.data.data.userId,
            });
          }
        } else {
          toast.error(' Your account has been locked');
          userService
            .logOut()
            .then((res) => {
              navigate('/auth/login');
            })
            .catch((err) => {
              console.log(err.response?.data?.error);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (user) {
      socket.on('newNotification-client', (data) => {
        if (data.authorId !== user._id && user._id === data.userId) {
          toast(' You have a new notification!');
        }
      });
    }
  }, [user]);

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
        <Route path="/tasks/chooselist/:projectId" element={<ChooseList />} />
        <Route path="/studyWithme" element={<StudyWithme />} />
        <Route path="tasks/member-project/:projectId" element={<MemberProject/>} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/postList/:projectId" element={<PostList />} />
        <Route path="tasks/task-project/:projectId" element={<Task/>} />
        <Route path="tasks/chat/:projectId" element={<Chats/>} />
        <Route path="tasks/training/:projectId" element={<TrainingList/>} />
        <Route path="tasks/training/:projectId/editor/:projectId" element={<EditorBlog/>} />
        <Route path="/youtube/:projectId/:videoId" element={<YoutubeView/>} />
        <Route path="/my-blog" element={<MyListBlog/>} />
        <Route path="/uploadCourse" element={<UploadCours/>} />
        <Route path="/allVideos" element={<ListeOfVideos/>} />
        <Route path="quizinformation/:id" element={<QuizInformation />} />
        <Route path="listequizz" element={<ListQuizPage />} />
        <Route path="/listpdf" element={<ListPdf/>} />
        <Route path="/updateCourse/:id" element={<UpdateCourse/>} />
        <Route path="/uploadPdf/:id" element={<UploadPdf/>} />
        {/* <Route path="/editor" element={<Editor/>} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz/:id" element={<SingleQuestion />} />
        <Route path="createquiz/:id" element={<CreataQuizPage />} />
  

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
