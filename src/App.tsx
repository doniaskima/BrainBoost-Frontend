import './styles/globals.css'
import styled, { keyframes, ThemeProvider } from 'styled-components';
import HeroPage from './pages/HeroPage';
import Login from './components/Auth/Login';
import { Route, Routes } from "react-router-dom";
import "./App.css"

function App() {


  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </div>
  )
}

export default App
