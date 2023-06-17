import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { MaterialTailwindControllerProvider } from "./context/index";
import './index.css';
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from './context/authProvider';
import { ConfigProvider } from 'antd';
import { antdConfig } from './constants/index';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <ThemeProvider>
        <ConfigProvider {...antdConfig}>
          <MaterialTailwindControllerProvider>      
          <AuthProvider>
            <App />
         </AuthProvider>
          </MaterialTailwindControllerProvider>
          </ConfigProvider>
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
