import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';
import { RouterProvider } from './context/RouterContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </RouterProvider>
  </React.StrictMode>
);
