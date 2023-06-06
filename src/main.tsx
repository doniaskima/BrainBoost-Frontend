import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { MaterialTailwindControllerProvider } from "./context/index";
import './index.css';
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from './context/authProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
          <AuthProvider>
            <App />
         </AuthProvider>
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
