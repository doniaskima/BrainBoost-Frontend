import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { MaterialTailwindControllerProvider } from "./context/index";
import "../public/css/tailwind.css";
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
       <BrowserRouter>
       <Provider store={store}>
       <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <App />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
       </Provider>
       </BrowserRouter>
  </React.StrictMode>,
)
