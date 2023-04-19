import './styles/globals.css'
import styled, { keyframes, ThemeProvider } from 'styled-components';
import HeroPage from './pages/HeroPage';
import Login from './components/Auth/Login';
import { Route, Routes } from "react-router-dom";
import Signup from './components/Auth/Signup';
import "./App.css"
import Reset from './components/Auth/Reset';

function App() {


  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<Reset />} />
    </Routes>
    </div>
  )
}

export default App
