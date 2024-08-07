import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Toaster } from 'sonner';
import { UserProvider } from './components/Context/UserContext'; // Adjust the path as necessary

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <UserProvider>
      <App />
      <Toaster />
    </UserProvider>
  </Provider>
);
