import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from './App'
import { BrowserRouter } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
       <BrowserRouter>
       <Provider store={store}>
      <App />
       </Provider>
       </BrowserRouter>
  </React.StrictMode>,
)
